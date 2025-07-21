import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { use } from "react";



export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket,axios} = useContext(AuthContext);

    // Fuction to get all users in the sidebar 

    const getUsers = async () => {
        try{
            const {data} = await axios.get("/api/messages/users");
            if(data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        }
        catch(err)
        {
            toast.error("Something went wrong while fetching users");
        }
    }

    // Function to get messages between Selected users

    const getMessages = async (userId) =>{
        try{
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success) {
                setMessages(data.messages);
            }
        }
        catch(err)
        {
            toast.error("Something went wrong while fetching messages", err);
        }
    }


    // Function to send message to the selected user

    const sendMessage = async (payload) => {
        try{
            let body;
            if (typeof payload === 'string') {
                body = { text: payload };
            } else if (payload && payload.image) {
                body = { image: payload.image };
            } else {
                body = {};
            }
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, body);
            if(data.success){
                setMessages((prevMessages) => [...prevMessages, data.data]);
            }
            else{
                toast.error(data.message);
            }
        }
        catch (err) {
            toast.error("Something went wrong while sending message", err);
            console.error("Error in sendMessage:", err);
        }
    }


    //Function to subscribe to new messages from socket

    const subscribeToNewMessages = () => {
        if(!socket) return;

        socket.on("message", (message) => {
            if(selectedUser && message.senderId === selectedUser._id) {
                message.isSeen = true; // Mark as seen if it's the selected user
                setMessages((prevMessages) => [...prevMessages, message]);

                axios.put(`api/messages/mark/${message._id}`);
            }
            else{
                setUnseenMessages(() =>({
                    ...unseenMessages,
                    [message.senderId]: (unseenMessages[message.senderId] || 0) + 1
                }))
            }
        });
    }


    // Function to unsubscribe from new messages

    const unsubscribeFromNewMessages = () => {
        if(!socket) return;

        socket.off("message");
    }


    useEffect(() =>{
        subscribeToNewMessages();

        return () => {
            unsubscribeFromNewMessages();
        }
    }, [socket, selectedUser]);

    const value = {
        messages,
        users,
        selectedUser,
        unseenMessages,
        setUnseenMessages,
        setMessages,
        setUsers,
        setSelectedUser,
        getUsers,
        getMessages,
        sendMessage,
    }
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}