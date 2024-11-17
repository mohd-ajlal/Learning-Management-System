"use client"
import AdminProtected from '../../../app/hooks/adminProtected'
import Heading from '../../../app/utils/Heading'
import React from 'react'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar'
import DashboardHero from '../../components/Admin/DashBoardHero'
import EditHero from '../../components/Admin/Customization/EditHero'



type Props = {
    
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
                <DashboardHero />
                <EditHero />
               

            </div>
        </div>
      </AdminProtected>
    </div>
    )
}

export default page