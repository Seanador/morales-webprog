import { FaGithub } from 'react-icons/fa';

// enhancement 1

const Footer = () => {
  return (
    <footer className="border-t-2 border-teal-800 bg-teal-600 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4">

        <a
          href="https://github.com/Seanador"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-200 transition-all duration-200 hover:text-white hover:scale-110"
        >
          <FaGithub size={32} />
        </a>

        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-100">
          Built with React & Tailwind CSS
        </p>

        <p className="text-xs text-teal-200">
          © 2026 SABM. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;