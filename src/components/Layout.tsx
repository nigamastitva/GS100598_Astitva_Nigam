import React from "react";
import { NavLink } from "react-router-dom";
import { Store, ShoppingBag, BarChart3, LineChart } from "lucide-react";
import Gsynergy from "../Assets/Gsynergy Logo V2 Long Description.svg";
const navItems = [
  { path: "/", icon: Store, label: "Stores" },
  { path: "/skus", icon: ShoppingBag, label: "SKUs" },
  { path: "/planning", icon: BarChart3, label: "Planning" },
  { path: "/chart", icon: LineChart, label: "Chart" },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src={Gsynergy} alt="GSynergy" className="w-20 h-20 " />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Navigation */}
        <div className="w-64 bg-white shadow-sm">
          <nav className="mt-5 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
