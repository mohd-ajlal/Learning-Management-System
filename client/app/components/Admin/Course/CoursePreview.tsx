import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  coursedata: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  coursedata,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const disCountPercentage =
    ((coursedata?.estimatedPrice - coursedata?.price) /
      coursedata?.estimatedPrice) *
    100;
  const disCountPercentagePrice = disCountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] mx-auto py-6 mb-5 text-gray-800 dark:text-gray-200">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer videoUrl={coursedata?.demoUrl} title={coursedata?.title} />
        </div>
        <div className="flex items-center mt-5">
          <h1 className="text-2xl font-semibold">
            {coursedata?.price === 0 ? "Free" : `${coursedata?.price}$`}
          </h1>
          {coursedata?.estimatedPrice && (
            <>
              <h5 className="pl-3 text-lg mt-1 line-through text-gray-500">
                {coursedata?.estimatedPrice}$
              </h5>
              <h4 className="pl-5 pt-1 text-lg text-green-600">
                {disCountPercentagePrice}% Off
              </h4>
            </>
          )}
        </div>
        <div className="flex items-center mt-5">
          <button
            className="w-[180px] bg-crimson text-white py-2 rounded cursor-not-allowed"
            disabled
          >
            Buy Now {coursedata?.price}$
          </button>
        </div>
        <div className="flex items-center mt-3">
          <input
            type="text"
            placeholder="Discount code ..."
            className="w-full max-w-xs p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 bg-gray-50 dark:bg-gray-800"
          />
          <button className="ml-3 w-[120px] bg-blue-500 text-white py-2 rounded">
            Apply
          </button>
        </div>
        <ul className="mt-4 list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
          <li>Source Code Included</li>
          <li>Full Lifetime Access</li>
          <li>Certificate Of Completion</li>
        </ul>
      </div>

      <div className="w-full mt-10">
        <h1 className="text-2xl font-semibold">{coursedata?.name}</h1>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2">
            <Ratings rating={0} />
            <span>0 Reviews</span>
          </div>
          <span className="mr-10">0 students</span>
        </div>

        <h1 className="text-2xl font-semibold mt-8">
          What you will learn from this course?
        </h1>
        {coursedata?.benefits?.map((item: any, index: number) => (
          <div key={index} className="flex items-center py-2">
            <IoCheckmarkDoneOutline className="text-green-500 mr-2" />
            <p>{item.title}</p>
          </div>
        ))}

        <h1 className="text-2xl font-semibold mt-8">
          Prerequisites for starting this course
        </h1>
        {coursedata?.preRequisites?.map((item: any, index: number) => (
          <div key={index} className="flex items-center py-2">
            <IoCheckmarkDoneOutline className="text-green-500 mr-2" />
            <p>{item.title}</p>
          </div>
        ))}

        <h1 className="text-2xl font-semibold mt-8">Course Details</h1>
        <p className="text-lg mt-4 whitespace-pre-line">
          {coursedata?.description}
        </p>
      </div>

      <div className="w-full flex items-center justify-between mt-10 space-x-4">
        <button
          className="w-full sm:w-1/3 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
          onClick={prevButton}
        >
          Previous
        </button>
        <button
          className="w-full sm:w-1/3 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition duration-200"
          onClick={createCourse}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
