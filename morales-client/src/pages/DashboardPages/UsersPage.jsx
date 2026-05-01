import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const teal = {
  50:  "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  400: "#2dd4bf",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a",
};

const allRows = [
  { id: 1, lastName: "Snow",       firstName: "Jon",      age: 14,   status: "Active"   },
  { id: 2, lastName: "Lannister",  firstName: "Cersei",   age: 31,   status: "Inactive" },
  { id: 3, lastName: "Lannister",  firstName: "Jaime",    age: 31,   status: "Active"   },
  { id: 4, lastName: "Stark",      firstName: "Arya",     age: 11,   status: "Active"   },
  { id: 5, lastName: "Targaryen",  firstName: "Daenerys", age: null, status: "Pending"  },
  { id: 6, lastName: "Melisandre", firstName: null,       age: 150,  status: "Active"   },
  { id: 7, lastName: "Clifford",   firstName: "Ferrara",  age: 44,   status: "Inactive" },
  { id: 8, lastName: "Frances",    firstName: "Rossini",  age: 36,   status: "Active"   },
  { id: 9, lastName: "Roxie",      firstName: "Harvey",   age: 65,   status: "Pending"  },
];

const statusStyles = {
  Active:   { bg: teal[100],  color: teal[800],  dot: teal[600]  },
  Inactive: { bg: "#fee2e2",  color: "#991b1b",  dot: "#ef4444"  },
  Pending:  { bg: "#fef9c3",  color: "#854d0e",  dot: "#eab308"  },
};

function getInitials(firstName, lastName) {
  return `${(firstName || "?")[0]}${(lastName || "?")[0]}`.toUpperCase();
}

function stringToColor(str) {
  const palette = [teal[600], teal[700], teal[800], "#0f766e", "#0d9488"];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

const StatusBadge = ({ value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",  
        justifyContent: "center", 
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          color: "#374151",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const columns = [
  {
    field: "avatar", headerName: "", width: 52, sortable: false,
    renderCell: (params) => {
      const initials = getInitials(params.row.firstName, params.row.lastName);
      return (
        <Avatar sx={{
          width: 30, height: 30, fontSize: 11, fontWeight: 700,
          bgcolor: stringToColor(initials), mt: "10px",
        }}>
          {initials}
        </Avatar>
      );
    },
  },
  { field: "id",        headerName: "ID",         width: 60  },
  { field: "firstName", headerName: "First Name", width: 140, editable: true },
  { field: "lastName",  headerName: "Last Name",  width: 140, editable: true },
  { field: "age",       headerName: "Age",        type: "number", width: 90, editable: true },
  {
    field: "fullName", headerName: "Full Name", width: 180, sortable: false,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`.trim(),
  },
  {
    field: "status", headerName: "Status", width: 130,
    renderCell: (params) => <StatusBadge value={params.value} />,
  },
];

const ageGroups = ["0–18", "19–30", "31–50", "51+"];
const ageGroupCounts = allRows.reduce((acc, row) => {
  const age = row.age;
  if (age === null) return acc;
  if (age <= 18) acc[0]++;
  else if (age <= 30) acc[1]++;
  else if (age <= 50) acc[2]++;
  else acc[3]++;
  return acc;
}, [0, 0, 0, 0]);

const statusCounts = allRows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

const pieData = Object.entries(statusCounts).map(([label, value], id) => ({
  id, value, label,
  color: label === "Active" ? teal[600] : label === "Inactive" ? "#ef4444" : "#eab308",
}));

const activeCount   = allRows.filter((r) => r.status === "Active").length;
const inactiveCount = allRows.filter((r) => r.status === "Inactive").length;
const avgAge = (
  allRows.reduce((s, r) => s + (r.age || 0), 0) /
  allRows.filter((r) => r.age !== null).length
).toFixed(1);

const statCards = [
  { label: "Total Users",    value: allRows.length, accent: teal[600] },
  { label: "Active Users",   value: activeCount,    accent: teal[700] },
  { label: "Inactive Users", value: inactiveCount,  accent: "#ef4444" },
  { label: "Average Age",    value: avgAge,         accent: "#eab308" },
];

export default function UserPage() {
  const [search, setSearch] = useState("");

  const filteredRows = allRows.filter((row) => {
    const term = search.toLowerCase();
    return (
      (row.firstName || "").toLowerCase().includes(term) ||
      (row.lastName  || "").toLowerCase().includes(term) ||
      (row.status    || "").toLowerCase().includes(term)
    );
  });

  return (
    <div sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200 }}>

      <Box sx={{
        mb: 3, px: 3, py: 2.5,
        background: teal[600],
        borderBottom: `2px solid ${teal[800]}`,
        borderRadius: 2,
      }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#fff" }}>
          Users
        </Typography>
        <Typography variant="body2" sx={{ color: teal[100], mt: 0.5 }}>
          Manage, view, and analyze all registered users.
        </Typography>
      </Box>


      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
        {statCards.map((card) => (
          <Card key={card.label} elevation={0} sx={{
            flex: 1,
            borderTop: `3px solid ${card.accent}`,
            borderRadius: 2,
            border: `1px solid ${teal[100]}`,
            borderTopColor: card.accent,
          }}>
            <CardContent sx={{ pb: "14px !important" }}>
              <Typography sx={{
                fontSize: 11, fontWeight: 700, color: teal[700],
                textTransform: "uppercase", letterSpacing: 1, mb: 0.5,
              }}>
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight={800} sx={{ color: card.accent }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <Card elevation={0} sx={{
          flex: 1.4, borderRadius: 2,
          border: `1px solid ${teal[100]}`,
        }}>
          <CardContent>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: teal[800], mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Age Distribution
            </Typography>
            <BarChart
              series={[{ data: ageGroupCounts, label: "Users", color: teal[600] }]}
              height={210}
              xAxis={[{ data: ageGroups, scaleType: "band", label: "Age Group" }]}
            />
          </CardContent>
        </Card>

        <Card elevation={0} sx={{
          flex: 1, borderRadius: 2,
          border: `1px solid ${teal[100]}`,
        }}>
          <CardContent>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: teal[800], mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Status Breakdown
            </Typography>
            <PieChart
              series={[{ data: pieData, innerRadius: 45 }]}
              width={290}
              height={210}
            />
          </CardContent>
        </Card>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 1.5 }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 13, color: teal[800], textTransform: "uppercase", letterSpacing: 0.8 }}>
          User Directory
        </Typography>
        
      </Stack>

      <Box sx={{
        height: 430, width: "100%",
        "& .MuiDataGrid-root": {
          border: `1px solid ${teal[200]}`,
          borderRadius: "10px",
          overflow: "hidden",
          fontSize: 13,
        },
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: teal[50],
          borderBottom: `2px solid ${teal[200]}`,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
          fontSize: 11,
          color: teal[800],
          textTransform: "uppercase",
          letterSpacing: 0.7,
        },
        "& .MuiDataGrid-cell": {
          color: "#374151",
          borderBottom: `1px solid ${teal[50]}`,
        },
        "& .MuiDataGrid-row:hover": { bgcolor: teal[50] },
        "& .MuiDataGrid-row.Mui-selected":       { bgcolor: `${teal[100]} !important` },
        "& .MuiDataGrid-row.Mui-selected:hover": { bgcolor: `${teal[100]} !important` },
        "& .MuiDataGrid-footerContainer": {
          borderTop: `1px solid ${teal[200]}`,
          bgcolor: teal[50],
        },
        "& .MuiCheckbox-root.Mui-checked":         { color: teal[600] },
        "& .MuiCheckbox-root.MuiCheckbox-indeterminate": { color: teal[600] },
        "& .MuiDataGrid-columnSeparator":          { color: teal[200] },
        "& .MuiDataGrid-sortIcon":                 { color: teal[600] },
        "& .MuiTablePagination-root":              { color: teal[700] },
      }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}