// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         // ✅ Use `https://` instead of `wss://`
//         const newSocket = io("https://self-chef-igom.onrender.com", {
//             transports: ["websocket", "polling"], // ✅ Add "polling" as a fallback
//             secure: true,
//             reconnection: true,
//             reconnectionAttempts: 5,
//             reconnectionDelay: 2000,
//         });

//         newSocket.on("connect", () => console.log("✅ Connected:", newSocket.id));
//         newSocket.on("connect_error", (err) => console.error("❌ Connection Error:", err));
//         newSocket.on("disconnect", () => console.log("⚠️ Disconnected"));

//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect(); // Cleanup on unmount
//         };
//     }, []);

//     return (
//         <SocketContext.Provider value={socket}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export const useSocket = () => useContext(SocketContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const BACKEND = process.env.BACKEND_URL;
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // const newSocket = io(BACKEND, { transports: ["websocket","polling"], withCredentials: true });
        // const newSocket = io("https://self-chef-igom.onrender.com", { transports: ["websocket", "polling"] });
        const newSocket = io("https://self-chef-backend-l96d.onrender.com", { transports: ["polling"] });


        newSocket.on("connect", () => console.log("Connected:", newSocket.id));
        newSocket.on("disconnect", () => console.log("Disconnected"));

        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Cleanup on unmount
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
