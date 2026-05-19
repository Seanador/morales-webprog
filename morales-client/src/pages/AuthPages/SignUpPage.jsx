import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-teal-50 outline-none transition placeholder:text-white/30 focus:border-teal-400 focus:bg-white/[0.09]';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    type: 'editor',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUser(form);
      navigate('/auth/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-teal-800 px-8 py-10">

        <h1 className="text-2xl font-semibold tracking-tight text-teal-50">Sign Up</h1>
        <p className="mt-1.5 text-sm text-teal-400">
          Create your account to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                placeholder="John"
                autoComplete="given-name"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Doe"
                autoComplete="family-name"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                Age
              </label>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                type="text"
                placeholder="29"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Contact Number
            </label>
            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              type="text"
              placeholder="09171234567"
              autoComplete="tel"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="johndoe"
              autoComplete="username"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={inputClasses}
              required
            />
            <p className="mt-1.5 text-xs text-teal-500">
              Minimum 8 characters — letters, numbers, and symbols.
            </p>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              placeholder="123 Bayani St, Makati City"
              autoComplete="street-address"
              className={inputClasses}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cyan-100 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-900 shadow-sm transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {['Google', 'Apple'].map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-white/10 bg-white/[0.06] py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300 transition hover:bg-white/[0.11] hover:text-teal-100"
              >
                {label}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-teal-500">
          Already have an account?{' '}
          <Link
            to="/auth/signin"
            className="font-semibold text-teal-50 transition hover:text-teal-300"
          >
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;