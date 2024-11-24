import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-10">
      <div className="w-[90%] 800px:w-[80%] m-auto">
        {/* Heading */}
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-[#000] font-extrabold tracking-tight">
          Expand Your Career <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
            Opportunities
          </span>{" "}
          With Our Courses
        </h1>
        <br />

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          // Course Grid
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
            {courses && courses.length > 0 ? (
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No courses available at the moment.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
