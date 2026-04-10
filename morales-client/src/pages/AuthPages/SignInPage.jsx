import { Link } from 'react-router-dom';

const inputClasses =
  'mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-teal-50 outline-none transition placeholder:text-white/30 focus:border-teal-400 focus:bg-white/[0.09]';

const SignInPage = () => {
  return (
   <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-teal-800 px-8 py-10">

        <h1 className="text-2xl font-semibold tracking-tight text-teal-50">Log In</h1>
        <p className="mt-1.5 text-sm text-teal-400">Access your account to continue.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="signin-email"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300"
            >
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="signin-password"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300"
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className={inputClasses}
            />
            <p className="mt-1.5 text-xs text-teal-500">
              Minimum 8 characters — letters, numbers, and symbols.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-teal-300">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-white/20 accent-teal-400"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-xs font-medium text-teal-400 transition hover:text-teal-200"
            >
              Forgot Password?
            </button>
          </div>

         
          <button
            type="submit"
            className="w-full rounded-full bg-cyan-100 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-900 shadow-sm transition hover:opacity-90 active:scale-[0.98]"
          >
            Log In
          </button>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { label: 'Google' },
              { label: 'Apple' },
            ].map(({ label }) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-white/10 bg-white/[0.06] py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300 transition hover:bg-white/[0.11] hover:text-teal-100"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-teal-500">
          No account yet?{' '}
          <Link
            to="/auth/signup"
            className="font-semibold text-teal-50 transition hover:text-teal-300"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;