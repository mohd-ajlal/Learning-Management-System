import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mb-2">
      <div className="border-t border-gray-300 dark:border-gray-700 my-6" />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/mohd-ajlal"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/mohd_ajlal/"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/mohdajlal.ajlal"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Contact Us
            </h3>
            <div className="text-base text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                <span className="font-medium">Call:</span> +91-6306043512
              </p>
              <p>
                <span className="font-medium">Address:</span> H Block, GLA
                University, Mathura
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:ajlal00786@gmail.com"
                  className="hover:underline hover:text-gray-800 dark:hover:text-white"
                >
                  ajlal00786@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Gravity | All Rights Reserved
          </p>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Designed and Developed 💻 by Nutaj
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
