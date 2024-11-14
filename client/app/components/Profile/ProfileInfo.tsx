import React, { FC, useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.png";
import Image from "next/image";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type User = {
  avatar?: { url: string };
  role?: string;
  email?: string;
  name?: string;
};

type Props = {
  avatar: string | null;
  user?: User;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: successProfileEdit, error: errorEdit }] = useEditProfileMutation();

  useLoadUserQuery(undefined, { skip: !loadUser });

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          updateAvatar(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess || successProfileEdit) {
      setLoadUser(true);
      toast.success("Profile Updated Successfully");
    }
    if (error || errorEdit) {
      console.error(error || errorEdit);
      toast.error("Error updating profile");
    }
  }, [isSuccess, error, successProfileEdit, errorEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      await editProfile({ name });
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6 space-y-8 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl">
      <div className="relative w-full flex justify-center">
        <Image
          src={user?.avatar?.url || avatar || avatarIcon}
          alt="User Avatar"
          width={130}
          height={130}
          className="w-[130px] h-[130px] cursor-pointer rounded-full border-[4px] border-teal-500 shadow-lg"
        />
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <label htmlFor="avatar" className="absolute bottom-3 right-3">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-transform transform hover:scale-110 mr-[80vh]">
            <AiOutlineCamera size={18} className="text-white" />
          </div>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <label className="block pb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm transition-all duration-200 ease-in-out"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block pb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-sm"
            readOnly
            value={user?.email || ""}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg shadow-lg hover:from-teal-600 hover:to-teal-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-teal-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
