import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { io } from "socket.io-client";

const backenurl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backenurl;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [AuthUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const checkAuth = async () => {
        try {
            // Debug: log token before checkAuth
            console.log("[Auth Debug] Token before checkAuth:", axios.defaults.headers.common["token"]);
            const { data } = await axios.get("/api/auth/check")

            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        }
        catch (err) {
            // Only show toast and log if not 401 Unauthorized
            if (err.response && err.response.status === 401) {
                setAuthUser(null);
                setToken(null);
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["token"];
                // Do NOT log 401 errors to the console
            } else {
                toast.error("Something went wrong while checking authentication");
                console.error("Error in checkAuth:", err);
            }
        }
    }


    //Login function to handle user login

    const login = async (state, credentials) =>{
        try{
            // Capitalize endpoint to match backend
            const endpoint = state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();
            const {data} = await axios.post(`/api/auth/${endpoint}`, credentials);

            if (data.success) {
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                // Debug: log token after login
                console.log("[Auth Debug] Token after login:", data.token);
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
        catch(err){
            // Show backend error message if available
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong while logging in");
            }
            console.error("Error in login:", err);
        }
    }



    // Logout function to handle user logout and socket disconnection


    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;

        toast.success("Logged out successfully");
        if(socket) socket.disconnect();
    }


    // Function to update user profile

    const updateProfile = async (profileData) => {
        try{
            const data = await axios.put("/api/auth/UpdateProfile", profileData);

            if (data.success) {
                setAuthUser(data.userData);
                toast.success("Profile updated successfully");
            }
        }
        catch(err){
            console.error("Error in updateProfile:", err);
            toast.error("Something went wrong while updating profile");
        }
    }

    //Connect socket funtion to handle socket connection and online users update

    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;

        const newSocket = io(backenurl, {
            query: {
                userId: userData._id,
            },
        })

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });
    }

    useEffect(() => {
        // Always set axios header from localStorage token on mount
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            axios.defaults.headers.common['token'] = storedToken;
        }
        // Debug: log all token sources
        console.log("[Auth Debug] Token in localStorage:", storedToken);
        console.log("[Auth Debug] Token in axios header:", axios.defaults.headers.common["token"]);
        checkAuth();
        // eslint-disable-next-line
    }, [token]);

    const value = {
        axios,
        AuthUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}