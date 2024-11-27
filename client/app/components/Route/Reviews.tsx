import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Alex Johnson",
    avatar: "/assets/ajlal.jpg",
    profession: "Software Engineer | Tech Solutions",
    comment:
      "E-learning's courses are a game-changer! The interactive lessons and practical projects have immensely helped me advance my career. Highly recommended for anyone eager to learn!",
  },
  {
    name: "Sophia Martinez",
    avatar: "/assets/ajlalphoto.jpg",
    profession: "Data Scientist | Innovate AI",
    comment:
      "The structure and depth of the courses are exceptional. The platform's ability to simplify complex concepts is outstanding. A fantastic learning experience!",
  },
  {
    name: "Michael Lee",
    avatar: "/assets/photo.jpg",
    profession: "UX Designer | Creative Minds",
    comment:
      "The focus on real-world applications sets E-learning apart. Their tutorials on design systems improved my workflow dramatically. Great job!",
  },
  {
    name: "Emily Brown",
    avatar: "/assets/ajlal.jpg",
    profession: "Frontend Developer | Bright Apps",
    comment:
      "This platform is unparalleled in its ability to teach with clarity and depth. E-learning has truly revolutionized my approach to coding and development!",
  },
  {
    name: "Liam Wilson",
    avatar: "/assets/ajlalphoto.jpg",
    profession: "AI Enthusiast | Future Vision Labs",
    comment:
      "E-learning's AI courses are comprehensive and engaging. The hands-on approach made even the most advanced topics approachable. Kudos to the team!",
  },
  {
    name: "Emma Davis",
    avatar: "/assets/photo.jpg",
    profession: "Backend Developer | CodeCraft",
    comment:
      "Exceptional content with a perfect blend of theory and practice. The projects I've built with their guidance have boosted my confidence and skills. Thank you, E-learning!",
  },
];

const Reviews = (props: Props) => {
    return (
      <div className="w-[90%] 800px:w-[85%] mx-auto py-12 bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
        <div className="w-full flex flex-col-reverse 800px:flex-row items-center gap-8">
          {/* Image Section */}
          <div className="800px:w-[50%] w-full relative">
            <Image
              src="/assets/background1.svg"
              alt="Students celebrating"
              width={700}
              height={700}
              className="rounded-lg shadow-lg object-cover"
            />
            {/* Decorative Element */}
            <div className="absolute top-[-20px] left-[-20px] w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute bottom-[-30px] right-[-30px] w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 blur-xl opacity-50 animate-pulse"></div>
          </div>
  
          {/* Text Section */}
          <div className="800px:w-[50%] w-full">
            <h3
              className={`${styles.title} text-[28px] 800px:!text-[40px] text-center 800px:text-left`}
            >
              Our Students Are{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Our Strength
              </span>
              <br />
              See What They Say About Us
            </h3>
            <p className="mt-4 text-center 800px:text-left text-gray-600 dark:text-gray-300">
              Join thousands of satisfied learners who have unlocked their
              potential with E-learning. Their success stories reflect our
              dedication to quality education and innovation.
            </p>
          </div>
        </div>
  
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard item={review} key={index} />
          ))}
        </div>
      </div>
    );
  };

  
export default Reviews;
