import React, { FC } from 'react';
import Link from "next/link";
import Image from "next/image";
import Ratings from '../../../app/utils/Ratings';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import web from "@/public/assets/web.png"

type Props = {
    item: any;
    isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return  (
      <Link href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}>
          <div className="w-full h-[380px] bg-white dark:bg-gradient-to-tr dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 backdrop-blur-md border dark:border-[#ffffff1d] border-[#00000015] rounded-lg p-4 shadow-lg hover:shadow-xl hover:dark:shadow-slate-800 transition-transform transform hover:scale-[1.02]">
              {/* Thumbnail */}
              <div className="relative h-[160px] w-full rounded overflow-hidden">
                  <Image
                        src={web}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>

                {/* Course Details */}
                <div className="mt-4">
                    <h1 className="text-lg font-semibold text-black dark:text-white line-clamp-2">
                        {item.name}
                    </h1>
                    <div className="flex items-center justify-between mt-2">
                        <Ratings rating={item.ratings} />
                        <h5 className={`text-sm font-medium text-gray-600 dark:text-gray-300 ${isProfile && "hidden 800px:inline"}`}>
                            {item.purchased} Students
                        </h5>
                    </div>
                </div>

                {/* Pricing and Lecture Count */}
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <h3 className="text-xl font-bold text-black dark:text-white">
                            {item.price === 0 ? "Free" : `$${item.price}`}
                        </h3>
                        {item.estimatedPrice > item.price && (
                            <h5 className="text-sm font-medium line-through opacity-70 text-gray-500 dark:text-gray-400">
                                ${item.estimatedPrice}
                            </h5>
                        )}
                    </div>
                    <div className="flex items-center">
                        <AiOutlineUnorderedList size={20} className="text-gray-500 dark:text-gray-400" />
                        <h5 className="pl-2 text-sm text-gray-600 dark:text-gray-300">
                            {item.courseData?.length || 0} Lectures
                        </h5>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
