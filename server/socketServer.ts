import {Server as SocketIOServer} from "socket.io";
import http from "http";


export const initSocketServer = (server: http.Server) =>{
    const io = new SocketIOServer(server);

    io.on("connection", (socket)=>{
        console.log("connection established");


        // Listen for notifications event from frontend server

        socket.on("notification", (data)=>{
            io.emit("newNotification", data);
        })

        socket.on("disconnect",()=>{
            console.log("connection disconnected");
        })
    })
}