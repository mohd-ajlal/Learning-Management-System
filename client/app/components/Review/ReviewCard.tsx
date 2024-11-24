import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = ({ item }: Props) => {
  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={item.avatar}
          alt={item.name}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div>
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {item.name}
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.profession}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 italic">
        "{item.comment}"
      </p>

      {/* Ratings */}
      <div className="mt-4 flex items-center gap-1">
        <Ratings rating={5} />
      </div>
    </div>
  );
};

export default ReviewCard;
