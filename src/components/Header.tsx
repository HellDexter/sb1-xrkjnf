import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import clsx from 'clsx';

export const Header = () => {
  const location = useLocation();

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={clsx(
        'hover:text-blue-200 transition-colors',
        location.pathname === to && 'text-blue-200'
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8" />
            <span className="text-2xl font-bold">JobForMe</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/upload">Nahrát životopis</NavLink>
            <NavLink to="/jobs">Nabídky práce</NavLink>
            <NavLink to="/market">Přehled trhu</NavLink>
            <NavLink to="/interview">Příprava na pohovor</NavLink>
          </div>
          <Link
            to="/upload"
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold 
                     hover:bg-blue-50 transition-colors"
          >
            Začít
          </Link>
        </div>
      </nav>
    </header>
  );
}