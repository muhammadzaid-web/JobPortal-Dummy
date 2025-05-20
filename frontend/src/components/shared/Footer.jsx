import { Link } from "react-router-dom";

function Footer() {
  {
    /* Gradient Animation */
  }
  <style>
    {`
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 5s ease infinite;
        }
        `}
  </style>;
  return (
    <footer className="footer footer-center rounded p-10 relative overflow-hidden">
      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center gap-4 font-medium">
        <Link to="/">
          <li className=" hover:text-indigo-900 transition-all">Home</li>
        </Link>
        <Link to="/jobs">
          <li className=" hover:text-indigo-900 transition-all">Jobs</li>
        </Link>
        <Link to="/browse">
          <li className=" hover:text-indigo-900 transition-all">Browse</li>
        </Link>
        <Link to="/profile">
          <li className=" hover:text-indigo-900 transition-all">Profile</li>
        </Link>
      </ul>

      {/* Social Media Icons */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className="hover:scale-110 transition transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a className="hover:scale-110 transition transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a className="hover:scale-110 transition transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
          <a className="hover:scale-110 transition transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M20.45 2H3.55A1.55 1.55 0 002 3.55v16.9A1.55 1.55 0 003.55 22h16.9A1.55 1.55 0 0022 20.45V3.55A1.55 1.55 0 0020.45 2zM8.12 18.13H5.44V9h2.68v9.13zM6.78 7.74a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zm12.34 10.39h-2.68v-4.34c0-1.03-.02-2.35-1.44-2.35-1.44 0-1.66 1.12-1.66 2.27v4.42H10.7V9h2.57v1.24h.04a2.82 2.82 0 012.54-1.4c2.71 0 3.2 1.78 3.2 4.09v5.2z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Copyright */}
      <aside className="mt-4 text-sm">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Mohd
          Zaid
        </p>
      </aside>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 animate-gradient"></div>
    </footer>
  );
}

export default Footer;
