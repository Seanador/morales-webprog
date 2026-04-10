import { Link } from 'react-router-dom';

const inputClasses =
  'mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-teal-50 outline-none transition placeholder:text-white/30 focus:border-teal-400 focus:bg-white/[0.09]';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-teal-800 px-8 py-10">

        <h1 className="text-2xl font-semibold tracking-tight text-teal-50">Sign Up</h1>
        <p className="mt-1.5 text-sm text-teal-400">
          Create your account to get started.
        </p>

        <form className="mt-8 space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                autoComplete="given-name"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className={inputClasses}
            />
            <p className="mt-1.5 text-xs text-teal-500">
              Minimum 8 characters — letters, numbers, and symbols.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-cyan-100 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-900 shadow-sm transition hover:opacity-90 active:scale-[0.98]"
          >
            Create Account
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