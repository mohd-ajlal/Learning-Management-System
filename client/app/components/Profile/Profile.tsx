'use client'

import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});
  const [courses, setCourses] = useState([]);

  const {} = useLogOutQuery(undefined, {
    skip: !logout?true:false,
  });

  const logOutHandler = async () => {
      setLogout(true)
    await signOut();
    toast.success("Logged out successfully");
  };

  // Scroll effect for the sidebar
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 85);
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourses: any) =>
          data.courses.find((course: any) => course._id === userCourses._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user]);

  return (
    <div className="flex w-[85%] mx-auto pt-10 space-x-10">
      {/* Sidebar */}
      <div
        className={`flex flex-col w-[70px] 800px:w-[300px] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-lg ${
          scroll ? "sticky top-20" : "top-30"
        } transition-all duration-300 ease-in-out`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg">
        {active === 1 && (
          <div className="mt-8">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}
        {active === 2 && (
          <div className="mt-8">
            <ChangePassword />
          </div>
        )}
        {active === 3 && (
          <div className="mt-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses && courses.length > 0 ? (
                courses.map((item: any, index: any) => (
                  <CourseCard item={item} key={index} isProfile={true} />
                ))
              ) : (
                <h1 className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400">
                  You Don&apos;t Have Any Purchased Courses!
                </h1>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
