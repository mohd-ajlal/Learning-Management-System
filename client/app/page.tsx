"use client";

import React, {FC, useState} from "react" ;
import Heading from "./utils/Heading";
import Header from './components/Header';
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
// import FAQ from "./components/FAQ/FAQ";
// import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = ()=>{
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return(
    <div>
      <Heading
        title="Gravity Coaching Classes"
        description="Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching"
        keywords="IIT, JEE, IIT-JEE, NEET, FOUNDATION, Coaching, Classes, Gravity, Gravity Coaching Classes, Engineering, Medical,Lucknow"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
        
      />
      <div className="m-8 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg">
      <Hero/>
      <Courses />
      <br />
      <br />
        <Reviews />
        {/* <FAQ /> */}
        {/* <Footer /> */}
        </div>   
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-400 blur-xl opacity-30"></div>
      
    </div>
  )
}

export default Page;