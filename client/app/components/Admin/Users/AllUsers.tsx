import React, { FC, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

import Loader from "../../Leader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/user/userApi";
import { styles } from "@/app/styles/style";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({isTeam}) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      setActive(false);
      toast.success("User role updated successfully");
    }
    if (deleteSuccess) {
      refetch();
      setOpen(false);
      toast.success("User deleted successfully");
    }
  }, [updateError, isSuccess, deleteSuccess, refetch]); // Add dependencies to the useEffect hook

  const column = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-red-700 text-red-500"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Email",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a title='mail-link' href={`mailto:${params.row.email}`}>
              <AiOutlineMail
                className="dark:text-white text-black mt-3"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px] ml-5">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end items-center mt-4">
  <button
    className={`flex items-center justify-center transition-transform duration-200 hover:scale-105 
      rounded-md px-5 py-2 bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold shadow-lg 
      dark:bg-[#57c7ac] dark:border dark:border-[#ffffff6c] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-300`}
    onClick={() => setActive(!active)}
  >
    Add New Member
    <span className="ml-2 text-lg">➕</span>
  </button>
</div>

          <Box
            m="40px 0 0 0 "
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                // border: "none",
                // outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#180202" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#334396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#334396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#b7ebde !important" : "#000",
              },
              "&. MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={column} />
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
                Are you sure you want to delete this user?
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
          {active && (
            <Modal
  open={active}
  onClose={() => setActive(!active)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white dark:bg-[#021233] w-[90%] max-w-[500px] rounded-lg shadow-lg p-6">
    <h1 className="text-gray-800 dark:text-white text-center text-xl font-semibold mb-4">
      Add New Member
    </h1>
    <div className="w-full mt-5 relative mb-1">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        htmlFor="email"
      >
        Email Address
      </label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        placeholder="Enter email"
        className="w-full px-4 py-2 text-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-1"
        htmlFor="role"
      >
        Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="admin" className="dark:bg-gray-800">
          Admin
        </option>
        <option value="user" className="dark:bg-gray-800">
          User
        </option>
      </select>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={() => setActive(!active)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Member
        </button>
      </div>
    </div>
  </Box>
</Modal>

          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;