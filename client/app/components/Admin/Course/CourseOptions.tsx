import React, { FC } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

interface Props {
    active: number;
    setActive: (active: number) => void;
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ];

    return (
        <div className="space-y-4">
            {options.map((option, index) => (
                <div
                    key={index}
                    className={`flex items-center cursor-pointer py-3 transition-all duration-300 ${
                        active === index ? "text-blue-600" : "text-gray-500 dark:text-gray-300"
                    } hover:text-blue-500`}
                    onClick={() => setActive(index)}
                >
                    <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 ${
                        active >= index ? "bg-blue-500" : "bg-gray-600 dark:bg-[#384766]"
                    } relative`}>
                        {active > index ? (
                            <IoMdCheckmark className="text-[20px] text-white" />
                        ) : (
                            <span className="text-[15px] font-semibold text-white">{index + 1}</span>
                        )}
                        {index !== options.length - 1 && (
                            <div
                                className={`absolute h-[40px] w-1 left-[50%] transform -translate-x-1/2 transition-all duration-300 ${
                                    active >= index ? "bg-blue-500" : "bg-gray-600 dark:bg-[#384766]"
                                } bottom-[-100%]`}
                            />
                        )}
                    </div>
                    <h5 className={`pl-4 text-lg font-medium ${
                        active === index ? "text-blue-600 font-semibold" : "text-gray-500 dark:text-gray-300"
                    } transition-all duration-300`}>
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    );
};

export default CourseOptions;
