"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Footer from "../components/Footer"

type Props = {};


const teamMembers = [
    {
        name: "Mohd Ajlal",
        role: "Lead Full Stack Developer",
        avatar: "/assets/photo.jpg",
        bio: "Mohd Ajlal is the driving force behind our Learning Management System. As the Lead Full Stack Developer, he specializes in crafting scalable, efficient, and user-centric web applications. With a deep passion for innovation and a relentless commitment to excellence, Mohd has architected and developed the core features of the platform, ensuring a seamless blend of performance and functionality. His expertise and vision are the foundation of this transformative project, empowering education through technology."
    },
    {
      name: "Dheeraj Kumar",
      role: "Full Stack Developer",
      avatar: "/assets/photo.jpg",
      bio: "Dheeraj is a problem-solving enthusiast who creates seamless back-end and front-end solutions with a focus on user experience.",
    },
    {
      name: "Madhu Solanki",
      role: "Content Maker",
      avatar: "/assets/photo.jpg",
      bio: "Madhu crafts engaging and educational content that bridges the gap between complex ideas and user understanding.",
    },
    {
      name: "Arsh Agrawal",
      role: "UI/UX Designer",
      avatar: "/assets/photo.jpg",
      bio: "Arsh transforms ideas into visually stunning interfaces, ensuring intuitive and user-centric designs.",
    },
    {
      name: "Abhishek Soni",
      role: "UI/UX Designer",
      avatar: "/assets/photo.jpg",
      bio: "Abhishek creates elegant and functional designs, focusing on delivering exceptional user experiences.",
    },
  ];

  
const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(1);
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
        <div className="mt-8 ml-8 mr-8 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg">
          {/* Project Section */}
          <section className="text-center">
            <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              About the Project
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              The Learning Management System (LMS) is a comprehensive, full-stack
              web application designed to facilitate online education and training.
              It leverages modern web technologies to create a scalable, efficient,
              and engaging platform for students, educators, and administrators.
            </p>
          </section>
    
          {/* Team Section */}
          <section className="mt-12">
            <h2 className="text-3xl font-semibold text-gradient bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent text-center">
              Meet Our Team
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                >
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  </div>
                  {/* Name & Role */}
                  <h3 className="mt-12 text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
                    {member.name}
                  </h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                  {/* Bio */}
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                  {/* Glow Effect */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 blur-xl opacity-30"></div>
                </div>
              ))}
            </div>
          </section>
          <Footer />
        </div>
        </>
      );
    };
    
  
export default page