"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import OrdersAnalytics from "../../components/Admin/Analytics/OrdersAnalytics";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
            title='Gravity - Admin'
            description='Gravity is an online learning platform for students'
            keywords='Gravity, online learning, education, courses'
        />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;