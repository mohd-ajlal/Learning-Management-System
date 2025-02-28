'use client'

import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from "../components/Profile/Profile"
import { useSelector } from 'react-redux';

type Props = {}

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(6);
    const [route, setRoute] = useState("Login");

    const {user} = useSelector((state:any)=>state.auth)

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} profile || Gravity`}
                    description="Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching"
                    keywords="IIT, JEE, IIT-JEE, NEET, FOUNDATION, Coaching, Classes, Gravity, Gravity Coaching Classes, Engineering, Medical, Lucknow"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />

<Profile user={user} />
            </Protected>
        </div>
    );
}

export default Page;
