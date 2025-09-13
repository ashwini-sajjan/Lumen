// pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  BarChart3,
  Plus,
  Activity,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = ({ sidebarCollapsed }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { userProfile } = useAuth();
  const isAdmin = userProfile?.userType === "admin";

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Stats (admin = analytics, user = subscription info)
  const stats = isAdmin
    ? [
        {
          name: "Active Subscriptions",
          value: "1,234",
          icon: Users,
          change: "+12%",
        },
        {
          name: "Cancelled Subscriptions",
          value: "89",
          icon: AlertTriangle,
          change: "-3%",
        },
        {
          name: "Most Popular Plan",
          value: "Premium Plus",
          icon: Package,
          change: "",
        },
        {
          name: "Revenue (This Month)",
          value: "$12,345",
          icon: DollarSign,
          change: "+8%",
        },
      ]
    : [
        {
          name: "Current Plan",
          value: "Pro Tier",
          icon: Package,
          change: "",
        },
        {
          name: "Status",
          value: "Active",
          icon: Activity,
          change: "",
        },
        {
          name: "Next Billing",
          value: "Sept 20",
          icon: BarChart3,
          change: "",
        },
        {
          name: "Auto-Renewal",
          value: "Enabled",
          icon: ClipboardList,
          change: "",
        },
      ];

  // Quick Actions (admin = manage system, user = manage subscription)
  const quickActions = isAdmin
    ? [
        { name: "Create New Plan", icon: Plus },
        { name: "Manage Plans", icon: Package },
        { name: "View Analytics", icon: BarChart3 },
        { name: "View Audit Logs", icon: ClipboardList },
      ]
    : [
        { name: "Browse Plans", icon: Package },
        { name: "Manage Subscriptions", icon: Activity },
        { name: "Renew / Upgrade", icon: BarChart3 },
        { name: "Update Profile", icon: Users },
      ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        marginLeft:
          screenWidth >= 1024
            ? sidebarCollapsed
              ? "4rem"
              : "16rem"
            : "0rem",
      }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isAdmin
            ? "Monitor subscriptions, manage plans, and view analytics."
            : "Here’s an overview of your subscriptions and billing."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            {stat.change && (
              <div
                className={`mt-4 flex items-center text-sm ${
                  stat.change.includes("-")
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                <ArrowUpRight className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md mb-3">
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {action.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.main>
  );
};

export default Dashboard;
