// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Home,
  BarChart3,
  FileText,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Plans", href: "/plans", icon: Package },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/connexis",
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      href: "https://github.com/connexis",
      icon: Github,
      color: "hover:text-gray-800",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/connexis",
      icon: Twitter,
      color: "hover:text-blue-500",
    },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@connexis.com", href: "mailto:hello@connexis.com" },
    { icon: Phone, text: "+1 (555) 987-6543", href: "tel:+15559876543" },
    { icon: MapPin, text: "456 Cloud Ave, Tech City, TC 54321", href: "https://maps.google.com" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Connexis</h3>
                <p className="text-blue-600 text-sm">Subscription Management</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              Connexis streamlines subscription lifecycles—subscribe, upgrade,
              renew, or cancel—all in one secure, real-time platform.
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-3 bg-white rounded-xl text-gray-600 shadow-md hover:shadow-lg transition-all duration-300 ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 group"
                    >
                      <Icon className="w-4 h-4 text-blue-500 group-hover:scale-125 transition-transform duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-6 relative">
              Get in Touch
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h4>

            <ul className="space-y-4">
              {contactInfo.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.li
                    key={i}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <a
                      href={c.href}
                      className="flex items-start space-x-3 text-gray-600 hover:text-blue-600 group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-sm">{c.text}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Plan Management",
                text: "Easily create and manage subscription plans.",
                icon: Package,
                color: "text-blue-500",
              },
              {
                title: "Real-time Analytics",
                text: "Track active vs cancelled subscriptions.",
                icon: BarChart3,
                color: "text-green-500",
              },
              {
                title: "Detailed Reports",
                text: "Comprehensive insights for admins.",
                icon: FileText,
                color: "text-purple-500",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-inner">
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h5 className="text-gray-900 font-semibold mb-2">{f.title}</h5>
                <p className="text-gray-600 text-sm">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <span>© {currentYear} Connexis. All rights reserved.</span>
            <div className="hidden md:flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by the Connexis team</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-blue-600">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-blue-600">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
