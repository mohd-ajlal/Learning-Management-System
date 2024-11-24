'use client'


import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar' 
import AdminProtected from '../hooks/adminProtected'
import DashBoardHero from '../components/Admin/DashBoardHero'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
        <Heading
            title='Gravity - Admin'
            description='Gravity is an online learning platform for students'
            keywords='Gravity, online learning, education, courses'
        />

        <div className='flex h-[200vh]'>
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar/>
            </div>
            <div className="w-[85%]">
            <DashBoardHero isDashboard={true} />
            </div>
        </div>
        </AdminProtected>
    </div>
  )
}

export default page