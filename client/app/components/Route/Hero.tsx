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
        <div className="relative w-[50vh] h-[50vh] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden">
          <Image
            src="/assets/rupes.jpg"
            alt="hero image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      {/* Hero Text and Search */}
      <div className="w-full lg:w-1/2 lg:pl-10 flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
        <h2 className="text-2xl lg:text-5xl font-josefin font-semibold text-black dark:text-white mb-4 lg:mb-6 mt-[60px]">
        Welcome to Gravity Classes
        </h2>
        <p className="text-md lg:text-lg font-josefin font-semibold text-black dark:text-white mb-6">
        Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching
        </p>

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
      </div>
    </div>
  );
};

export default Hero;
