'use client'

import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import DashBoardHero from '../../components/Admin/DashBoardHero'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar' 
import AllCourses from '../../components/Admin/Course/AllCourses'

type Props = {}

const page = (props: Props) => {
  return (
    <AdminProtected>
    <Heading
        title='Gravity - Admin'
        description='Gravity is an online learning platform for students'
        keywords='Gravity, online learning, education, courses'
    />

    <div className='flex h-screen'>
        <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar/>
        </div>
        <div className="w-[85%]">
            <DashBoardHero/>
            <AllCourses/>
        </div>
    </div>
    </AdminProtected>
  )
}

export default page