// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowRight,
  Package,
  BarChart3,
  Users,
  Shield,
  Zap,
  Bell,
  Database,
  Repeat,
  ClipboardList,
  TrendingUp,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: Package,
      title: "Plan Management (Admin)",
      description:
        "Admins can create, update, and manage subscription plans and pricing in real-time.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights (Admin)",
      description:
        "Track active vs. cancelled subscriptions, revenue, and most popular plans.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description:
        "Secure portals for admins and users with Firebase Auth role management.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Repeat,
      title: "Full Subscription Lifecycle",
      description:
        "Users can subscribe, renew, upgrade, downgrade, or cancel anytime.",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      icon: Bell,
      title: "Renewal & Alerts",
      description:
        "Notifications and reminders for renewals, upgrades, or cancellations.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      icon: Database,
      title: "Audit Logs (Admin)",
      description:
        "Track all user and admin actions for accountability and transparency.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
  ];

  const firebaseFeatures = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Email/Password and Google Sign-in powered by Firebase Auth.",
    },
    {
      icon: Cloud,
      title: "Scalable Cloud Backend",
      description: "Firestore + Firebase Functions handle subscriptions in real-time.",
    },
    {
      icon: TrendingUp,
      title: "Realtime Updates",
      description: "Plan changes and subscription updates sync instantly across devices.",
    },
    {
      icon: ClipboardList,
      title: "Reliable Storage",
      description: "Plan assets and subscription data stored safely in Firebase.",
    },
  ];

  const stats = [
    { number: "1,000+", label: "Active Subscriptions", icon: Package },
    { number: "99.9%", label: "Uptime", icon: TrendingUp },
    { number: "50+", label: "Plans Managed", icon: Database },
    { number: "24/7", label: "Support", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <section className="relative overflow-hidden pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/30 dark:to-purple-900/30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 mb-8 shadow-xl"
          >
            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Connexis – Firebase-Powered Subscription Management
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            <span className="block">Smarter Subscriptions</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Built on Firebase, Built for Scale
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Connexis gives admins the tools to manage plans and analytics, and
            users the freedom to manage their subscriptions—securely, in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center mb-16"
          >
            <Link
              to="/dashboard"
              className="group flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:scale-110 hover:-rotate-1 transition-all duration-500"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotateY: 8 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 dark:bg-gray-800/80 rounded-2xl mb-4 shadow-md">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Subscription Management Made Simple
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tools for admins to manage plans and analytics, and for users to
              control their subscription lifecycle—backed by Firebase.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotateY: 6 }}
                  className="group bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center animate-pulse`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by Firebase
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connexis is built on Firebase for security, scalability, and real-time access.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {firebaseFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to Simplify Subscription Management?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Join businesses using Connexis to manage subscriptions effortlessly—powered by Firebase.
          </motion.p>
          <div className="flex items-center justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold shadow-lg hover:scale-110 transition-all duration-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;