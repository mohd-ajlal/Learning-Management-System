"use client";

import React, {FC, useState} from "react" ;
import Heading from "./utils/Heading";
import Header from './components/Header';

interface Props {}

const Page: FC<Props> = ()=>{
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

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
        
      />
    </div>
  )
}

export default Page;