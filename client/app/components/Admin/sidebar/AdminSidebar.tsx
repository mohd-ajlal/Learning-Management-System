"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  QuizIcon,
  WebIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
  WysiwygIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assets/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

type itemProps = {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
};

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px]">{title}</Typography>
      <Link href={to} shallow />
    </MenuItem>
  );
};
const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };
  return (
    <Box
  sx={{
    "& .pro-sidebar-inner": {
      background: `${theme === "dark"
        ? "rgba(17, 28, 67, 0.9)"
        : "rgba(255, 255, 255, 0.85)"}`,
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      border: `2px solid ${theme === "dark" ? "#6870fa" : "#5b6fe6"}`,
      transition: "all 0.3s ease", // Smooth background and border transition
    },
    "& .pro-icon-wrapper": {
      backgroundColor: "transparent !important",
    },
    "& .pro-inner-item:hover": {
      color: "#868dfb !important",
      transform: "scale(1.05)",
      transition: "transform 0.2s ease-in-out, color 0.3s ease-in-out", // Make hover effect smoother
      cursor: "pointer",
    },
    "& .pro-menu-item.active": {
      color: "#6870fa !important",
      background: `${theme === "dark"
        ? "rgba(104, 112, 250, 0.3)"
        : "rgba(91, 111, 230, 0.2)"}`,
      borderRadius: "8px",
      transition: "all 0.3s ease", // Smooth transition for active state
    },
    "& .pro-inner-item": {
      padding: "10px 35px 10px 20px !important",
      transition: "all 0.2s ease-in-out", // Smooth item transition
    },
  }}
  className="shadow-lg rounded-xl p-2"
>
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu>
          {/* logo and menu icon here */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
              >
                <Link href="/" style={{ textDecoration: "none" }}>
                  <h3
                    className="text-[25px] uppercase dark:text-white text-black"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "bold",
                      background: "linear-gradient(90deg, #6c63ff, #4a90e2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    Gravity
                  </h3>
                </Link>

                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                  style={{
                    color: theme === "dark" ? "#ffffffc1" : "#000",
                    transition: "transform 0.2s ease-in-out",
                    animation: "pulse 2s infinite",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "rotate(-20deg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "rotate(0deg)")
                  }
                >
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>

                <style jsx>{`
                  .pulse {
                    animation: pulse 2s infinite;
                  }
                  @keyframes pulse {
                    0%,
                    100% {
                      transform: scale(1);
                    }
                    50% {
                      transform: scale(1.1);
                    }
                  }
                `}</style>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={120}
                  height={120}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box
                textAlign="center"
                sx={{
                  position: "relative",
                  p: 1,
                  mt:4,
                  border: "2px solid",
                  borderColor: theme === "dark" ? "#6870fa" : "#5b6fe6",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: theme === "dark" ? "#111c43" : "#f3f4f6",
                  boxShadow: "0px 0px 15px rgba(104, 112, 250, 0.4)",
                  
                }}
              >
                <Typography
                  variant="h4"
                  className="!text-[20px]"
                  style={{
                    background: "linear-gradient(90deg, #6c63ff, #4a90e2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {user?.name}
                </Typography>

                <Typography
                  variant="h6"
                  className="!text-[20px] capitalize"
                  sx={{
                    color: theme === "dark" ? "#ffffffc1" : "#333",
                    fontWeight: "400",
                    letterSpacing: "0.5px",
                    marginTop: "5px",
                    transition:
                      "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                    "&:hover": {
                      color: "#6c63ff",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  {user?.role}
                </Typography>

                <style jsx>{`
                  @keyframes glow-border {
                    0% {
                      box-shadow: 0 0 5px rgba(104, 112, 250, 0.5);
                    }
                    100% {
                      box-shadow: 0 0 20px rgba(104, 112, 250, 0.7);
                    }
                  }
                `}</style>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[18px] capitalize text-gray-500 dark:text-[#ffffffc1] mt-4 ml-6"              sx={{ m: "15px 0 5px 25px " }}
            >
              {!isCollapsed && "data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] capitalize text-black dark:text-[#ffffffc1]"
              sx={{ m: "15px 0 5px 25px " }}
            >
              {!isCollapsed && "context"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[20px] capitalize text-black dark:text-[#ffffffc1]"
              sx={{ m: "15px 0 5px 25px " }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[20px] capitalize text-black dark:text-[#ffffffc1]"
              sx={{ m: "15px 0 5px 25px " }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] capitalize text-black dark:text-[#ffffffc1]"
              sx={{ m: "15px 0 5px 25px " }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Course Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Order Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[16px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              setSelected={setSelected}
              selected={selected}
            />
            <div onClick={logoutHandler}>
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon />}
                setSelected={setSelected}
                selected={selected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
