"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from '../utils/NavItems'
import ThemeSwitcher from '../utils/ThemeSwitcher'
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login"
import SignUp from "../components/Auth/SignUp"
import Verification from "../components/Auth/Verification"
import { useSelector } from "react-redux";
import Image from "next/image";
// import { cn } from "@/lib/utils";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/";

import avatar from "../../public/assets/avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route:string;
  setRoute:(route:string)=>void;
}; 

const Header: FC<Props> = ({activeItem, setOpen, route, open, setRoute}) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
   const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false)
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  })
  
  console.log("user data: ", data);
  // useEffect(() => {
  //   if (!user) {
  //     if (data) {
  //       socialAuth({
  //         email: data?.user?.email,
  //         name: data?.user?.name,
  //         avatar: data?.user?.image,
  //       });
  //     }
  //   }
  //   if (data === null) {
  //     if(isSuccess){
  //       toast.success("Login Successfully");
  //     }
   
  //   }
  //   if(data === null){
  //     setLogout(true)
  //   }
  // }, [data, user]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideBar(false);
    }
  };

  // console.log("open: ", open, "route: ", route);
  // console.log("user: ", user);

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
       if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
         refetch();
       }
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Succesfull ");
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true); 
    }
  }, [data, userData,isLoading,isSuccess]);

  // if (typeof window !== "undefined") {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 80) {
  //       setActive(true);
  //     } else {
  //       setActive(false);
  //     }
  //   });
  // }
  // const handleClose = (e: any) => {
  //   if (e.target.id === "screen") {
  //     setOpenSidebar(false);
  //   }
  // };
    // console.log(user)
  return (
    <div className="w-full relative ">

      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gradient-to-b from-white to-white fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 900px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Gravity
              </Link>
            </div>

            <div className="flex items-center">
                <NavItems
                    activeItem={activeItem}
                    isMobile={false}
                />

                <ThemeSwitcher/>
                {/* only for mobile and tab */}
                <div className="900px:hidden">
                    <HiOutlineMenuAlt3
                    size={25}
                    className="cursor-pointer dark:text-white  text-black"
                    onClick={()=>setOpenSideBar(true)}
                    />
                
            </div>
           {
            user? (
            <Link href={"/profile"}>
            <Image
                src={user.avatar ? user.avatar.url : avatar}
                alt={user?.name || "User Avatar"}
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
                width={30}
                height={30}

                style={{border:activeItem === 6 ? "2px solid #ffc107" : "none"}}

            />
            </Link>
              
            
              
            ):(
              <HiOutlineUserCircle
              size={25}
              className="hidden 900px:block cursor-pointer dark:text-white  text-black"
              onClick={()=>setOpen(true)}
              />
            )
           }
            </div>

         
          </div>
        </div>


        {/* mobile sidebar */}
        {openSideBar && (
            <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
            >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                    <NavItems
                        activeItem={activeItem}
                        isMobile={true}
                />

            <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white  text-black"
                onClick={()=>setOpen(true)}
                /> 

                <br />
                <br />
                <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                    CopyRight &copy; 2024 Gravity Coaching Classes
                </p>
                </div>
            </div>
        )}
      </div>
      {
        route === "Login" && (
          <>
          {
            open && (
              <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Login}
              />
            )
          }
          </>
        )
      }


{
        route === "Sign-Up" && (
          <>
          {
            open && (
              <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={SignUp}
              />
            )
          }
          </>
        )
      }



{
        route === "Verification" && (
          <>
          {
            open && (
              <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Verification}
              />
            )
          }
          </>
        )
      }
    </div>
  );
};

export default Header;
