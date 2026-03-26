import { NavLink } from 'react-router-dom';
import logo from '../assets/images/SABM_logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-teal-800 bg-teal-600 backdrop-blur">
      <div className="flex items-center justify-between px-40 py-4">

        <NavLink to="/" className="group flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-15 w-auto object-contain transition-opacity duration-200 group-hover:opacity-70"
          />
        </NavLink>

        <nav className="hidden items-center md:flex">
          <div className="flex items-center gap-2 rounded-full bg-teal-900/70 px-2 py-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200',
                    isActive
                      ? 'bg-cyan-100 text-zinc-900 shadow-sm'
                      : 'text-zinc-200 hover:text-white',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

      </div>
    </header>
  );
};

export default NavBar;