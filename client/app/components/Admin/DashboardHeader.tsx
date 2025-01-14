"use client"
import ThemeSwitcher from '@/app/utils/ThemeSwitcher';
import {
    useGetAllNotificationsQuery,
    useUpdateNotificationStatusMutation,
  } from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import { format } from "timeago.js";


type Props = {
    open?: boolean;
    setOpen?: any;
  };
  

const DashboardHeader: FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const { data, refetch } = useGetAllNotificationsQuery(undefined, {
        refetchOnMountOrArgChange: true,
      });

    const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);


  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, refetch, audio]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };
    return (
        <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0 transition-transform duration-300'>
            <ThemeSwitcher />
            <div 
                className='relative cursor-pointer m-2 transition-transform duration-200 hover:scale-110' 
                onClick={() => setOpen(!open)}
            >
                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black transition-colors duration-200' />
                <span className='absolute -top-2 -right-2 bg-gradient-to-r from-teal-400 to-green-500 rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                {notifications && notifications.length}
                </span>
            </div>
            {open && (
                <div
                className='w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000] rounded-lg overflow-y-auto transition-opacity duration-500 transform ease-out'
                style={{ animation: 'fade-in 0.3s' }}
            >
            
                    <h5 className='text-center text-[20px] font-Poppins text-black dark:text-white p-3 border-b border-gray-300 dark:border-[#ffffff47]'>
                        Notifications
                    </h5>
                    
                    {notifications &&
            notifications.map((item: any, index: number) => (
                        <div key={index} className='notification-item'>
                            <div className='flex items-center justify-between p-2'>
                                <p className='text-gray-800 dark:text-gray-400'>{item.title}</p>
                                <p className='text-red-500 dark:text-red-800 cursor-pointer hover:underline'
                                onClick={() => handleNotificationStatusChange(item._id)}>
                                    Mark as Read
                                </p>
                            </div>
                            <p className='px-2 text-black dark:text-white text-[14px]'>
                                {item.message}
                            </p>
                            <p className='px-2 text-gray-500 dark:text-gray-400 text-[12px]'>
                            {format(item.createdAt)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <style jsx>{`
                .notification-item {
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.05));
                    padding: 0.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    transition: background 0.3s ease;
                }
                .notification-item:hover {
                    background: rgba(100, 100, 250, 0.1);
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardHeader;
