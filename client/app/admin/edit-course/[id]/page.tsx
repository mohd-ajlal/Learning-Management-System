"use client"
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../../app/utils/Heading';

import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import EditCourse from '../../../components/Admin/Course/EditCourse';

interface Props {
    
}

const page = ({params}:any) => {
    const id = params?.id
    return (
        <div>
            <Heading
        title='Gravity - Admin'
        description='Gravity is an online learning platform for students'
        keywords='Gravity, online learning, education, courses'
    />
            <div className='flex h-auto'>
                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>
                <div className='w-[85%] h-auto'>
                    <DashboardHeader />
                    <EditCourse id={id}/>

                </div>
            </div>
        </div>
    )
}

export default page