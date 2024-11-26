"use client";

import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Heading from "../utils/Heading";

import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(3);
    const [route, setRoute] = useState("Login");
  return (
    <>
          <Heading
        title="Gravity Coaching Classes"
        description="Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching"
        keywords="IIT, JEE, IIT-JEE, NEET, FOUNDATION, Coaching, Classes, Gravity, Gravity Coaching Classes, Engineering, Medical,Lucknow"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="w-[90%] 800px:w-[80%] mx-auto">
        {/* Header */}
        <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
          Get in Touch
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          We’d love to hear from you! Whether you have questions about our platform, need support, or want to collaborate, feel free to reach out.
        </p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Phone */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaPhoneAlt className="text-blue-500 dark:text-teal-400 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Call Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">+91-6306043512</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaEnvelope className="text-blue-500 dark:text-teal-400 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Email Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">ajlal00786@gmail.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaMapMarkerAlt className="text-blue-500 dark:text-teal-400 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Visit Us
              </h3>
              <p className="text-gray-600 dark:text-gray-400">H Block, GLA University, Mathura</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
            Drop Us a Message
          </h2>
          <form className="mt-8 max-w-2xl mx-auto space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-teal-400 dark:focus:border-teal-400"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-teal-400 dark:focus:border-teal-400"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-teal-400 dark:focus:border-teal-400"
                placeholder="Write your message here"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 dark:bg-teal-500 text-white rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-teal-400 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
      {/* <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 blur-xl opacity-30"></div> */}
    </>
  );
};

export default Page;
