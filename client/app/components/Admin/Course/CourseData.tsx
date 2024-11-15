import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  preRequisites: { title: string }[];
  setPrerequisites: (preRequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  preRequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenifitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...preRequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...preRequisites, { title: "" }]);
  };

  const handleNext = () => {
    if (benefits.some((b) => b.title) && preRequisites.some((p) => p.title)) {
      setActive(active + 1);
    } else {
      toast.error("Please fill in all fields to proceed.");
    }
  };

  const handlePrev = () => setActive(active - 1);

  return (
    <div className="w-[85%] m-auto mt-12 flex flex-col gap-8">
      <div className="mb-6">
        <label className="block text-[18px] font-semibold text-gray-800 dark:text-gray-300 mb-2">
          Benefits for students in this course
        </label>
        {benefits.map((benefit, index) => (
          <input
            key={index}
            type="text"
            name="benifit"
            placeholder="e.g., Learn full-stack development"
            value={benefit.title}
            onChange={(e) => handleBenifitChange(index, e.target.value)}
            className="w-full mb-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#222] text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          />
        ))}
        <MdAddCircle
          onClick={handleAddBenefit}
          className="text-[#4a90e2] mt-2 cursor-pointer text-[1.5rem] transition duration-200 hover:text-[#37a39a]"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[18px] font-semibold text-gray-800 dark:text-gray-300 mb-2">
          Prerequisites for this course
        </label>
        {preRequisites.map((prerequisite, index) => (
          <input
            key={index}
            type="text"
            placeholder="e.g., Basic knowledge of JavaScript"
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
            className="w-full mb-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#222] text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
          />
        ))}
        <MdAddCircle
          onClick={handleAddPrerequisite}
          className="text-[#4a90e2] mt-2 cursor-pointer text-[1.5rem] transition duration-200 hover:text-[#37a39a]"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-grow bg-[#4a90e2] text-white py-2 rounded-md transition duration-200 hover:bg-[#357bbd] dark:bg-[#2a4b80] dark:hover:bg-[#243c66]"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-grow bg-[#37a39a] text-white py-2 rounded-md transition duration-200 hover:bg-[#2b8a78] dark:bg-[#1e6c5c] dark:hover:bg-[#155347]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
