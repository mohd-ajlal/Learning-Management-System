import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setCollapsed] = useState(
    Array(courseContentData?.length)?.fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleCollapsedToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };
  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index]?.links?.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };
  const newContentHanler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("please Fill all the fileds first!");
    } else {
      let newVdioeSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last video section if available, else use user input
        if (lastVideoSection) {
          newVdioeSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        videoSection: newVdioeSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section Cant be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };
 console.log(courseContentData);
 
 return (
  <div className="container mx-auto mt-12 p-5">
    <form onSubmit={handleSubmit}>
      {courseContentData?.map((item: any, index: number) => {
        const showSectionInput =
          index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;

        return (
          <React.Fragment key={index}>
            <div
              className={`w-full p-6 rounded-lg shadow-md ${
                showSectionInput ? "mt-8" : ""
              } ${index % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}`}
            >
              {showSectionInput && (
                <div className="flex items-center mb-3">
                  <input
                    type="text"
                    className="w-full max-w-xs text-lg font-medium bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 outline-none transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                    value={item.videoSection}
                    placeholder="Untitled Section"
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BsPencil className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition" />
                </div>
              )}
              <div className="flex justify-between items-center">
                {isCollapsed[index] && (
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    {index + 1}. {item.title || ""}
                  </p>
                )}
                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`text-[20px] mr-2 text-red-600 dark:text-red-400 ${
                      index > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    className={`text-gray-700 dark:text-gray-300 transition-transform transform ${
                      isCollapsed[index] ? "rotate-180" : ""
                    } cursor-pointer`}
                    onClick={() => handleCollapsedToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="mt-4">
                    <label className="block text-gray-600 dark:text-gray-400 font-medium mb-2">
                      Video Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      value={item.title}
                      placeholder="Enter video title"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-600 dark:text-gray-400 font-medium mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      value={item.videoUrl}
                      placeholder="Enter video URL"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-600 dark:text-gray-400 font-medium mb-2">
                      Video Length (in Minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      value={item.videoLength}
                      placeholder="Enter video length"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoLength = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-600 dark:text-gray-400 font-medium mb-2">
                      Video Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      value={item.description}
                      placeholder="Enter description"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  {item?.links?.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="mt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`text-red-600 dark:text-red-400 text-[20px] ${
                            linkIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                          }`}
                          onClick={() =>
                            linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        value={link.title}
                        placeholder="Link title"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mt-3"
                        value={link.url}
                        placeholder="Link URL"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}
                  <button
                    className="mt-5 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => handleAddLink(index)}
                  >
                    <BsLink45Deg className="mr-2" /> Add Link
                  </button>
                </>
              )}
              {index === courseContentData.length - 1 && (
                <button
                  className="mt-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  onClick={() => newContentHanler(item)}
                >
                  <AiOutlinePlusCircle className="mr-2" /> Add New Content
                </button>
              )}
            </div>
          </React.Fragment>
        );
      })}
      <button
        className="mt-10 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        onClick={addNewSection}
      >
        <AiOutlinePlusCircle className="mr-2" /> Add New Section
      </button>
      <div className="w-full flex justify-between mt-10 space-x-4">
        <button
          className="w-full sm:w-1/3 py-3 rounded bg-[#4a90e2] text-white hover:bg-[#357bbd] transition duration-200"
          onClick={prevButton}
        >
          Previous
        </button>
        <button
          className="w-full sm:w-1/3 py-3 rounded bg-[#37a39a] text-white hover:bg-[#2b8a78] transition duration-200"
          onClick={handleOptions}
        >
          Next
        </button>
      </div>
    </form>
  </div>
);

}


export default CourseContent;