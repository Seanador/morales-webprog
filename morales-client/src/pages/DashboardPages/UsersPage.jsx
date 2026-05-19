import { useState, useEffect, useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: 'editor',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Load Users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setApiError('');
      const { data } = await fetchUsers();
      const usersFromApi = Array.isArray(data) ? data : data.users || [];
      setUsers(
        usersFromApi.map((user) => ({
          ...user,
          id: user._id || user.id,
        }))
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      setApiError('Unable to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filtering
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(q) ||
        user.firstName?.toLowerCase().includes(q) ||
        user.lastName?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.username?.toLowerCase().includes(q);

      const matchesRole = roleFilter ? user.role === roleFilter : true;
      const matchesGender = genderFilter ? user.gender === genderFilter : true;

      const matchesStatus =
        statusFilter === ''
          ? true
          : statusFilter === 'active'
            ? user.isActive
            : !user.isActive;

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, search, roleFilter, genderFilter, statusFilter]);

  const resetFilters = () => {
    setSearch('');
    setRoleFilter('');
    setGenderFilter('');
    setStatusFilter('');
  };

  // Modal
  const openModal = (user) => {
    setModal({ open: true, id: user?._id ?? user?.id ?? null });
    setForm(user ? { ...user, password: '' } : { ...blankForm });
    setErrors({});
    setShowPassword(false);
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
    setErrors({});
    setShowPassword(false);
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation
  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['role', 'Role'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Only require password on Add
    if (!modal.id && !form.password) {
      nextErrors.password = 'Password is required.';
    }

    // Age — numbers only
    if (!nextErrors.age && form.age) {
      if (!/^\d+$/.test(form.age.trim())) {
        nextErrors.age = 'Age must contain numbers only.';
      } else if (Number(form.age) < 1 || Number(form.age) > 120) {
        nextErrors.age = 'Age must be between 1 and 120.';
      }
    }

    // Contact number — exactly 11 digits
    if (!nextErrors.contactNumber && form.contactNumber) {
      if (!/^\d+$/.test(form.contactNumber.trim())) {
        nextErrors.contactNumber = 'Contact number must contain only numbers.';
      } else if (form.contactNumber.trim().length !== 11) {
        nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
      }
    }

    // Email format
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    // Duplicate email
    if (
      !nextErrors.email &&
      users.some((u) => u._id !== modal.id && u.id !== modal.id && u.email === email)
    ) {
      nextErrors.email = 'Email address already exists.';
    }

    // Username — no spaces
    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    // Duplicate username
    if (
      !nextErrors.username &&
      users.some((u) => u._id !== modal.id && u.id !== modal.id && u.username === username)
    ) {
      nextErrors.username = 'Username already exists.';
    }

    // Password — at least 8 characters
    if (!nextErrors.password && form.password && form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  // Save (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      const nextUser = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender.trim().toLowerCase(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        role: form.role.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        address: form.address.trim(),
        isActive: form.isActive,
      };

      // Only include password if it's provided
      if (form.password) {
        nextUser.password = form.password;
      }

      if (modal.id) {
        // Update user
        await updateUser(modal.id, nextUser);
      } else {
        // Add new user
        await createUser({ ...nextUser, password: form.password });
      }

      await loadUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
      setApiError('Failed to save user. Please try again.');
    }
  };

  // Toggle Status
  const toggleStatus = async (id) => {
    try {
      const user = users.find((u) => u._id === id || u.id === id);
      if (user) {
        await updateUser(id, { isActive: !user.isActive });
        await loadUsers();
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      setApiError('Failed to update user status. Please try again.');
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? '',
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // Columns
  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: 'username', headerName: 'Username', minWidth: 150 },
    { field: 'age', headerName: 'Age', width: 90 },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: 'contactNumber', headerName: 'Contact Number', minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 220 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.3 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? 'warning' : 'success'}
            onClick={() => toggleStatus(row._id || row.id)}
          >
            {row.isActive ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {/* Page header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Box>

      {apiError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      ) : null}

      {/* Search & filter bar */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'center' }}
          flexWrap="wrap"
        >
          <TextField
            label="Search"
            placeholder="Name, email, or username…"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearch('')}
                      edge="end"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />

          <TextField
            select
            label="Role"
            size="small"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {labelize(r)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Gender"
            size="small"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Genders</MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {labelize(g)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Status"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          <Button
            variant="outlined"
            size="medium"
            onClick={resetFilters}
            sx={{ whiteSpace: 'nowrap', alignSelf: { xs: 'flex-start' } }}
          >
            Reset Filters
          </Button>
        </Stack>
      </Paper>

      {/* Data table */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        {filteredUsers.length ? (
          <Box
            sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              loading={loading}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                  outline: 'none',
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            {loading
              ? 'Loading users...'
              : 'No users found. Use Add User to create your first record.'}
          </Alert>
        )}
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={{ xs: 1, pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField {...fieldProps('firstName', 'First Name')} />
                <TextField {...fieldProps('lastName', 'Last Name')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  {...fieldProps('age', 'Age', { inputProps: { inputMode: 'numeric' } })}
                />
                <TextField
                  {...fieldProps('gender', 'Gender', { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  {...fieldProps('contactNumber', 'Contact Number', {
                    inputProps: { inputMode: 'numeric', maxLength: 11 },
                  })}
                />
                <TextField
                  {...fieldProps('email', 'Email Address', { type: 'email' })}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  {...fieldProps('role', 'Role', { select: true })}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps('username', 'Username')} />
              </Stack>
              <TextField
                {...fieldProps('password', 'Password', {
                  type: showPassword ? 'text' : 'password',
                  placeholder: modal.id
                    ? 'Leave blank to keep current password'
                    : 'At least 8 characters',
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField
                {...fieldProps('address', 'Address', {
                  multiline: true,
                  rows: 3,
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? 'User status: Active'
                    : 'User status: Inactive'
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update User' : 'Save User'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;