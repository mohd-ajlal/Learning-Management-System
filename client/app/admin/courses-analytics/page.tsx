"use client"
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../utils/Heading'
import React from 'react'
import DashBoardHero from '../../components/Admin/DashBoardHero'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import CourseAnalysis from '../../components/Admin/Analytics/CourseAnalysis'


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

        <div className='flex h-screen'>
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar />
            </div>
            <div className='w-[85%]'>
                <DashBoardHero />
                <CourseAnalysis />

            </div>
        </div>
      </AdminProtected>
    </div>
    )
}

export default page