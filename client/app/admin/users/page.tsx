"use client"
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import DashBoardHero from "../../components/Admin/DashBoardHero"
import AllUsers from '../../../app/components/Admin/Users/AllUsers'

interface Props {
    
}

const page = (props: Props) => {
    return (
        <div>
      <AdminProtected>
      <Heading
        title='Gravity - Admin'
        description='Gravity is an online learning platform for students'
        keywords='Gravity, online learning, education, courses'
    />

        <div className='flex'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>
            <div className='w-[85%]'>
                <DashBoardHero />
                <AllUsers isTeam={false} />

            </div>
        </div>
      </AdminProtected>
    </div>
    )
}

export default page