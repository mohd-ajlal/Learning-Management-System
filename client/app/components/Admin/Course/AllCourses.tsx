import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useDeletCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import Loader from "../../Leader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deletCourse, { isSuccess, error }] = useDeletCourseMutation({});
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <AiOutlineEdit
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            size={20}
          />
        </Link>
      ),
    },
    {
      field: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(!open);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
            size={20}
          />
        </Button>
      ),
    },
  ];

  const rows: any = data
    ? data.courses.map((item: any) => ({
        id: item._id,
        title: item.name,
        ratings: item?.ratings,
        purchased: item?.purchased,
        created_at: format(item.createdAt),
      }))
    : [];

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully");
      setOpen(false);
    }
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    await deletCourse(courseId);
  };

  return (
    <div className="mt-[120px] ml-5">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <h1
            className={`text-3xl font-bold mb-6  ${
              theme === "dark"
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                : "text-gray-800"
            }`}
          >
            Manage All Courses
          </h1>
          <Box
            m="40px 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:
                  theme === "dark" ? "#333" : "linear-gradient(to right, #A4A9FC, #FFF)",
                color: theme === "dark" ? "#000" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "1px solid",
                borderColor: theme === "dark" ? "#555" : "#ccc",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#fff" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {open && (
            <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center 
                w-auto m-[20px] p-[30px] rounded-lg shadow-lg 
                bg-white dark:bg-[#021f57] dark:border dark:border-[#ffffff3b]`}
            >
              <h1
                className="text-lg font-semibold text-gray-800 dark:text-white text-center mb-6"
              >
                Are you sure you want to delete this course?
              </h1>
              <div className="w-full flex items-center justify-between">
                <button
                  className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold transition-transform duration-200 
                    hover:bg-green-600 hover:scale-105 dark:bg-green-600 dark:hover:bg-green-700 shadow-md"
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold transition-transform duration-200 
                    hover:bg-red-600 hover:scale-105 dark:bg-red-600 dark:hover:bg-red-700 shadow-md"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </Box>
          </Modal>
          
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
