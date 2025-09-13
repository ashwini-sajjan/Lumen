// components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Package,
  BarChart3,
  ClipboardList,
  FileText,
  Settings,
  User,
  LogOut,
  Tag,
  Shield,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ isOpen, setIsOpen, isCollapsed }) => {
  const location = useLocation();
  const { logout, userProfile } = useAuth();
  const isAdmin = userProfile?.userType === "admin";

  // Navigation Items based on PRD
  const navItems = isAdmin
    ? [
        { name: "Dashboard", href: "/admin-dashboard", icon: Shield, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { name: "Plan Management", href: "/plans", icon: Package, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
        { name: "Subscription Analytics", href: "/analytics", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
        { name: "Audit Logs", href: "/audit-logs", icon: FileText, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
        { name: "Discounts", href: "/discounts", icon: Tag, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-900/20" },
        { name: "Settings", href: "/settings", icon: Settings, color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-900/20" },
      ]
    : [
        { name: "Home / Plans", href: "/plans", icon: Home, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { name: "My Subscriptions", href: "/subscriptions", icon: ClipboardList, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
        { name: "Profile", href: "/profile", icon: User, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
        { name: "Settings", href: "/settings", icon: Settings, color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-900/20" },
      ];

  const isActive = (href) => location.pathname === href;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 40 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 40 } },
  };
  const desktopSidebarVariants = {
    expanded: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 40 } },
    collapsed: { width: "4rem", transition: { type: "spring", stiffness: 300, damping: 40 } },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 lg:z-30 ${
          isOpen || window.innerWidth >= 1024 ? "block" : "hidden"
        } lg:block`}
        variants={window.innerWidth >= 1024 ? desktopSidebarVariants : sidebarVariants}
        animate={window.innerWidth >= 1024 ? (isCollapsed ? "collapsed" : "expanded") : isOpen ? "open" : "closed"}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="px-3 space-y-2">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                      className={`flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                        active
                          ? `${item.bg} ${item.color} shadow-sm`
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                        <Icon
                          className={`w-5 h-5 ${active ? item.color : "text-gray-500 dark:text-gray-400"} ${
                            active ? "animate-pulse" : ""
                          }`}
                        />
                      </motion.div>
                      <AnimatePresence>
                        {(!isCollapsed || window.innerWidth < 1024) && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            className="ml-3 font-medium"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-2 w-2 h-2 rounded-full bg-current"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              {(!isCollapsed || window.innerWidth < 1024) && (
                <span className="ml-3 text-sm font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
