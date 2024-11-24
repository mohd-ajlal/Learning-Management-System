import React, { FC } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { AnimatedTooltip } from "../ui/animated-tooltip";

import AutoPlay from "embla-carousel-autoplay";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import items from "./items.json";

import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

import web from "../../../public/assets/web.png"
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

const people = [
  {
    id: 1,
    name: "Mohd Ajlal",
    designation: "IIT Kanpur",
    image: "/assets/ajlal.jpg",
  },
  {
    id: 2,
    name: "Ajlal",
    designation: "AIIMS Delhi",
    image: "/assets/ajlalphoto.jpg",
  },
  {
    id: 3,
    name: "M. Ajlal",
    designation: "IIT Bombay",
    image: "/assets/photo.jpg",
  },
  // Uncomment if needed
  // {
  //   id: 4,
  //   name: "Emily Davis",
  //   designation: "UX Designer",
  //   image: "/assets/rupes.jpg",
  // },
  // {
  //   id: 5,
  //   name: "Tyler Durden",
  //   designation: "Soap Developer",
  //   image: "/assets/rupes.jpg",
  // },
  // {
  //   id: 6,
  //   name: "Dora",
  //   designation: "The Explorer",
  //   image: "/assets/rupes.jpg",
  // },
];

type Props = {};

const Hero: FC<Props> = () => {
  const { data,refetch } = useGetHeroDataQuery("Banner", {});
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    
    <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start py-10 lg:py-20 px-4 lg:px-8">
      {/* Hero Image */}
      {/* <div className="mx-auto max-w-xs lg:ml-8">
        <Carousel
          plugins={[AutoPlay({ delay: 2000 })]}
          setApi={setApi}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="w-80">
                  <CardHeader className="text-center">
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col items-center justify-center p-6">
              <img 
                src={item.src} // Ensure this URL is valid
                alt={item.title} // Use a descriptive alt text for accessibility
                className="h-48 w-48 object-cover mb-4" // Tailwind classes for styling
              />
            </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div> */}

<div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
  <div className="relative  w-[60vh] h-[60vh]  rounded-full hero_animation 800px:h-[400px] 800px:w-[490px] 1100px:h-[500px] 1100px:w-[550px] 1500px:w-[500px] 1500px:h-[500px] 1500px:ml-14 1100px:mr-[100px] "> {/* Increased container size */}
    <div className="mx-auto max-w-xs lg:ml-8">

          <Image
            src={data?.layout?.banner?.image?.url || web}
            width={400}
            height={400}
            alt=""
            className="object-contain 1100px:max-w-[500px] w-[500px]  1500px:max-w[85%] h-[auto] z-[10]"

          />
      {/* <Carousel
        plugins={[AutoPlay({ delay: 2000 })]}
        setApi={setApi}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="w-80 border-none bg-gradient-to-b from-white to-[#8AC7DB] dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300"> 
                <CardHeader className="text-center">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img 
                    src={item.src}
                    alt={item.title}
                    className="h-80 w-80 object-cover mb-4" 
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  </div>
</div>

      {/* Hero Text and Search */}
      <div className="w-full lg:w-1/2 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
        {/* <h2 className="text-2xl lg:text-5xl font-josefin font-semibold text-black dark:text-white mb-4 lg:mb-6 mt-[60px]">
        Welcome to Gravity Classes
        </h2>
        <p className="text-md lg:text-lg font-josefin font-semibold text-black dark:text-white mb-6">
        Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching
        </p> */}

<h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]">
              {data?.layout?.banner?.title}
            </h2>
            <br />
            <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
              {data?.layout?.banner?.subTitle}
            </p>
            <br />
            <br />

        {/* Tooltip or additional content */}
        <div className="flex items-center justify-center mb-10">
          <AnimatedTooltip items={people} />
          <p className="dark:text-white text-black text-center mt-2 ml-5">
            10k+ Students Already Trusted Us
          </p>

          
          <Link href={"/courses"} className="text-[#39c1f3] mt-2 ml-2">
            View Courses
          </Link>
        </div>
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
            <input
              type="search"
              className="bg-white border dark:border-none dark:bg-black dark:placeholder:tex-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e]  dark:text-[#ffffffe6] text-[20px]  "
              placeholder="Search Courses...."
              // value={search}
              // onChange={(e:any) => setSearch(e.target.value)}
            />

            <div 
            // onClick={handleSearch}
            className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
              <BiSearch className="text-white" size={30} />
            </div>
          </div>
          <br />
          <br />
        
      </div>
    </div>
  );
};

export default Hero;
