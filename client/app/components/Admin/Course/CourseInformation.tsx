import React, { FC, useState, useEffect } from "react";
import { styles } from "../../../../app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

interface Props {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const {data} = useGetHeroDataQuery("Categories", {})
const [categories, setCategories] = useState([]);
useEffect(() => {
  if(data){
    setCategories(data?.layout?.categories)
  }
},[data])
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files?.[0]
    if(file){
      const reader = new FileReader();
      reader.onload = (e:any) => {
        if(reader.readyState === 2){
          setCourseInfo({...courseInfo, thumbnail:reader.result})
        }
      };
      reader.readAsDataURL(file);
    }

  }

  const handleDragOver = (e:any) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e:any) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = (e:any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0]

    if(file){
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({...courseInfo, thumbnail:reader.result})
      }
      reader.readAsDataURL(file);
    }
  }
  console.log(courseInfo);
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="NEXT JS"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Describe the course content"
            className={`${styles.input} !h-[200px] !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
         <div className='w-[45%]'>
         <label className={`${styles.label}`}>Course Price</label>
          <input
            type="number"
            name=""
            required
            value={courseInfo.price}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, price: e.target.value })
            }
            id="price"
            placeholder="29"
            className={`${styles.input}`}
          />
         </div>
         <div className='w-[50%]'>
         <label className={`${styles.label}`}>Estimated Price (Optional)</label>
          <input
            type="number"
            name=""
            required
            value={courseInfo.estimatedPrice}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
            }
            id="estimatedPrice"
            placeholder="79"
            className={`${styles.input}`}
          />
         </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
         <div className='w-[45%]'>
         
        <label className={`${styles.label}`}>Course Tags</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder="MERN, React, Node"
            className={`${styles.input}`}
          />

        
         </div>
         <div className='w-[50%]'>
         <label className={`${styles.label}`}>Course Categories</label><br />
          <select name="" title='categories' id='' className={`${styles.input}`}
          value={courseInfo.categories}
          onChange={(e:any) => setCourseInfo({...courseInfo, categories: e.target.value})}
          >
            <option value=''>{" "}Select category</option>
            {categories?.map((item:any) => (
              <option value={item.title} key={item._id}>{item.title}</option>
            ))}
          </select>
         </div>
        </div>
        
        <br />
        <div className="w-full flex justify-between">
         <div className='w-[45%]'>
         <label className={`${styles.label}`}>Course Level</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.level}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, level: e.target.value })
            }
            id="level"
            placeholder="Beginner / Intermediate / Expert"
            className={`${styles.input}`}
          />
         </div>
         <div className='w-[50%]'>
         <label className={`${styles.label}`}>Demo Url</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.demoUrl}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="demoUrl"
            placeholder="https://url.google.com"
            className={`${styles.input}`}
          />
         </div>
        </div>
        <br />
        <div className="w-full mb-8">
  <input 
    type="file" 
    accept="image/*" 
    id="file" 
    className="hidden" 
    onChange={handleFileChange} 
  />
  <label
    htmlFor="file"
    className={`relative w-full min-h-[10vh] p-3 border-2 border-dashed transition-all duration-300 ease-in-out 
                ${dragging ? "bg-blue-100 border-blue-400" : "bg-gray-50 border-gray-300"} 
                flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-600`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    {courseInfo.thumbnail ? (
      <div className="w-full flex justify-center items-center relative">
        <img
          src={courseInfo.thumbnail}
          alt="Course Thumbnail"
          className="rounded-lg shadow-md max-h-60 w-auto object-cover"
        />
        <button
          type="button"
          onClick={() => setCourseInfo({ ...courseInfo, thumbnail: "" })}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
        >
          ✕
        </button>
      </div>
    ) : (
      <span className="text-gray-600 dark:text-gray-300 text-center flex flex-col items-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p>Drag and drop your thumbnail here or <span className="text-blue-500 hover:underline">click to browse</span></p>
      </span>
    )}
  </label>
</div>

        <br />
        <div className="flex justify-end mt-6">
          <button type="submit" className="w-full sm:w-auto bg-green-600 text-white px-8 py-2 rounded-md shadow-lg hover:bg-green-700 transition">
            Next
          </button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;