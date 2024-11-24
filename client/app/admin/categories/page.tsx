"use client"
import React,{FC} from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import DashBoardHero from "../../components/Admin/DashBoardHero"
import AdminProtected from '../../hooks/adminProtected'
import EditCategories from "../../components/Admin/Customization/EditCategories"
type Props = {}

const page:FC<Props> = (props) => {
  return (
    <div>
    <AdminProtected>
    <Heading
        title='Gravity - Admin'
        description='Gravity is an online learning platform for students'
        keywords='Gravity, online learning, education, courses'
    />
        <div className="flex h-screen">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar/>
            </div>
             <div className="w-[85%]">
              <DashBoardHero/>
              <EditCategories/>
             </div>
        </div>
    </AdminProtected>
    </div>
  )
}

export default page