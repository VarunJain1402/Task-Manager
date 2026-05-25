import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, LayoutDashboard, Folders, LogOut, UserCircle, Menu, X } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-white/60 w-full px-6 transition-all duration-300">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-slate-800">
            <Sparkles className="h-6 w-6 text-indigo-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">Flow</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2 px-4 py-2 rounded-xl font-medium">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/projects" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2 px-4 py-2 rounded-xl font-medium">
              <Folders className="h-4 w-4" />
              Projects
            </Link>
          </div>
        </div>

        {/* Desktop User Profile and Sign Out */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/60 shadow-sm border border-white/40">
            <UserCircle className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-bold text-slate-700">{user.name}</span>
            <span className="text-[10px] bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
              {user.role}
            </span>
          </div>
          
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="group cursor-pointer flex items-center gap-0 hover:gap-2 px-3 py-2.5 rounded-full bg-white/60 shadow-sm border border-white/40 text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all duration-300 overflow-hidden"
            title="Logout"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap text-sm font-semibold select-none">
              Sign Out
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/60 border border-white/40 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/55 transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/40 bg-white/95 backdrop-blur-lg px-2 py-4 flex flex-col gap-4 transition-all duration-300">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-3 px-4 py-3 rounded-xl font-medium"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-3 px-4 py-3 rounded-xl font-medium"
            >
              <Folders className="h-5 w-5" />
              Projects
            </Link>
          </div>

          <hr className="border-slate-100" />

          {/* User profile card inside mobile menu */}
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/60 shadow-sm border border-white/45">
            <div className="flex items-center gap-3">
              <UserCircle className="h-8 w-8 text-indigo-500" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">{user.name}</span>
                <span className="text-[10px] w-fit bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider mt-0.5">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Out Button inside mobile menu */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsLogoutModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-600 font-semibold transition-all cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        heading="Confirm Logout"
        title="Are you sure you want to log out of your session? Any unsaved progress may be lost."
        confirmText="Log Out"
        cancelText="Cancel"
        type="danger"
      />
    </nav>
  );
};

export default Navbar;
