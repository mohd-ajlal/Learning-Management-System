import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type User = {
  avatar?: { url: string };
  role?: string;
};

type Props = {
  user?: User;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const profileImage = user?.avatar?.url || avatar || avatarDefault;

  return (
    <div className="w-full p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg mt-14 md:mt-0 md:w-64 lg:w-64">
      <div className="flex items-center p-4 mb-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
        <Image
          src={profileImage}
          alt="User Avatar"
          width={50}
          height={50}
          className="rounded-full shadow-lg border-2 border-white"
        />
        <h5 className="ml-4 text-lg font-semibold text-white md:text-xl">
          {user?.role === "admin" ? "Admin Account" : "My Account"}
        </h5>
      </div>

      <div
        className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-200 cursor-pointer ${
          active === 1
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-700 hover:text-indigo-200"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={profileImage}
          alt="User Avatar"
          width={30}
          height={30}
          className="rounded-full mr-3 md:mr-4"
        />
        <span className="text-sm md:text-base text-white">Account Overview</span>
      </div>

      <div
        className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-200 cursor-pointer ${
          active === 2
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-700 hover:text-indigo-200"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={18} className="mr-3 md:mr-4" />
        <span className="text-sm md:text-base text-white">Change Password</span>
      </div>

      <div
        className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-200 cursor-pointer ${
          active === 3
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-700 hover:text-indigo-200"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={18} className="mr-3 md:mr-4" />
        <span className="text-sm md:text-base text-white">Enrolled Courses</span>
      </div>

      {user?.role === "admin" && (
        <Link href="/admin" shallow>
          <div
            className={`flex items-center p-3 mb-2 rounded-lg transition-all duration-200 cursor-pointer ${
              active === 6
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-700 hover:text-indigo-200"
            }`}
            onClick={() => setActive(6)}
          >
            <MdOutlineAdminPanelSettings size={18} className="mr-3 md:mr-4" />
            <span className="text-sm md:text-base">Admin Dashboard</span>
          </div>
        </Link>
      )}

      <div
        className="flex items-center p-3 mt-4 rounded-lg transition-all duration-200 bg-red-600 text-white cursor-pointer hover:bg-red-700 border border-transparent hover:border-red-500"
        onClick={logOutHandler}
      >
        <AiOutlineLogout size={18} className="mr-3 md:mr-4" />
        <span className="text-sm md:text-base">Log Out</span>
      </div>
    </div>
  );
};

export default SideBarProfile;
