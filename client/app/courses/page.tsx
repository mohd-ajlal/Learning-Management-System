"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Leader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

const PageContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading, error } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");
  const [activeItem, setActiveItem] = useState(2);


  useEffect(() => {
    if (error) {
      // Handle API errors
      console.error("Error fetching courses:", error);
      return;
    }

    if (isLoading) return;

    if (category === "All") {
      setCourses(data?.courses || []);
    } else {
      setCourses(
        (data?.courses || []).filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses(
        (data?.courses || []).filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search, isLoading, error]);

  const categories = categoriesData?.layout?.categories || [];

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />
      <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
      <Heading
        title="Gravity Coaching Classes"
        description="Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching"
        keywords="IIT, JEE, IIT-JEE, NEET, FOUNDATION, Coaching, Classes, Gravity, Gravity Coaching Classes, Engineering, Medical,Lucknow"
      />
        <br />
        <div className="w-full flex items-center flex-wrap">
          <div
            className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
              } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
            onClick={() => setCategory("All")}
          >
            All
          </div>
          {categories.map((item: any, index: number) => (
            <div key={index}>
              <div
                className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                  } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory(item.title)}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
        {courses.length === 0 && (
          <p
            className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
          >
            {search
              ? "No courses found!"
              : "No courses found in this category. Please try another one!"}
          </p>
        )}
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const Page = () => (
  <Suspense fallback={<Loader />}>
    <PageContent />
  </Suspense>
);

export default Page;