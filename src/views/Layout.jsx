// src/views/Layout.jsx

import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header / Navbar */}
      <header className="bg-slate-900 text-slate-100 shadow">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo / App Name */}
          <h1 className="text-2xl font-semibold tracking-wide">
            Media Browser
          </h1>

          {/* Navigation Links */}
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="px-3 py-1 rounded-md hover:bg-slate-800 transition"
              >
                Home
              </Link>
            </li>

            {user && (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="px-3 py-1 rounded-md hover:bg-slate-800 transition"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className="px-3 py-1 rounded-md hover:bg-slate-800 transition"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="px-3 py-1 rounded-md hover:bg-slate-800 transition"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}

            {!user && (
              <li>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-md hover:bg-slate-800 transition"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-300 text-center py-4 text-sm text-slate-600">
        © {new Date().getFullYear()} Media Browser
      </footer>
    </div>
  );
};

export default Layout;
