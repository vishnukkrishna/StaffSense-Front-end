import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from "../../components/Contexts/AuthContext";
import { BACKEND_BASE_URL, wsApiUrl } from "../../api/Api";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from "axios";

function EmployeeChat() {

    const [recipientdetails, setRecipientDetails] = useState({})
    const [senderdetails, setSenderDetails] = useState({});
    const [senderid, setSenderId] = useState(null);
    const [recipientid, setRecipientId] = useState(null)
    const [clientstate, setClientState] = useState('');
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adminId = queryParams.get('adminId');
    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState(null);
    // const [userData, setUserData] = useState(null);
    const user_id = user && user.user_id;
    const messageRef = useRef()

    // ...................................

    const setUserProfileDetails = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/user/userdetails/${user_id}/`
            );
            setRecipientDetails(response.data)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const setSenderProfile = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/user/userdetails/${adminId}/`
            );
            setSenderDetails(response.data)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        setUserProfileDetails()
        setSenderProfile()
    }, [])

    const setUpChat = () => {
        axios.get(`${BACKEND_BASE_URL}/chat/user-previous-chats/${senderid}/${recipientid}/`).then((response) => {
            if (response.status == 200) {
                setMessages(response.data)
            }
        })

        const client = new W3CWebSocket(`${wsApiUrl}/ws/chat/${senderid}/?${recipientid}`);
        setClientState(client);
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        message: dataFromServer.message,
                        sender_username: dataFromServer.senderUsername,
                    },
                ]);
            }
        };

        client.onclose = () => {
            console.log('Websocket disconnected');
        }

        return () => {
            client.close();
        };
    }

    useEffect(() => {
        if (user) {
            setUserId(user.user_id);
            setUserProfileDetails();
            setSenderProfile();
        }
    }, [user]);

    useEffect(() => {
        if (userId && adminId) {
            setSenderId(adminId);
            setRecipientId(userId);
            setUpChat();
        }
    }, [userId, adminId]);

    useEffect(() => {
        if (senderid != null && recipientid != null) {
            setUpChat()
        }
    }, [senderid, recipientid, adminId])

    const onButtonClicked = () => {
        if (!clientstate || !clientstate.send || messageRef.current.value.trim() === "") {
            return;
        }

        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: recipientdetails.username,
                receiverUsername: senderdetails.username,
            })
        );

        messageRef.current.value = '';
    };


    // ....................................
    useEffect(() => {
        const el = document.getElementById('messages');
        el.scrollTop = el.scrollHeight;
    }, []);
    return (
        <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <span className="absolute text-green-500 right-0 bottom-0">
                            <svg width="20" height="20">
                                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                            </svg>
                        </span>
                        <img
                            src={BACKEND_BASE_URL + senderdetails?.profile_pic || '/path/to/default-image.jpg'}
                            alt=""
                            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                        />
                    </div>

                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                            <span className="text-gray-700 mr-3">Staff Sense</span>
                        </div>
                        <span className="text-lg text-gray-600">Admin</span>
                    </div>
                </div>
            </div>
            <div
                id="messages"
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
                <div
                    id="messages"
                    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                    {

                        messages.map((message) => {

                            if (message.sender_username == senderdetails.username) {

                                return (
                                    <div className="chat-message">

                                        <div className="flex items-end">
                                            <div className="flex flex-col space-y-2 text-lg max-w-lg mx-2 order-2 items-start">
                                                <div>
                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                        {message.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <img
                                                src={BACKEND_BASE_URL + senderdetails?.profile_pic}
                                                alt="My profile"
                                                className="w-8 h-8 rounded-full order-1"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="chat-message">
                                        <div className="flex items-end justify-end">
                                            <div className="flex flex-col space-y-2 text-lg max-w-xs mx-2 order-1 items-end">
                                                <div>
                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                                                        {message.message}
                                                    </span>
                                                </div>
                                            </div>
                                            <img
                                                src={BACKEND_BASE_URL + recipientdetails?.profile_pic}
                                                className="w-8 h-8 rounded-full order-2"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
                <div className="relative flex mb-28">
                    <input
                        ref={messageRef}
                        type="text"
                        placeholder="Write your message!"
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-2xl py-3"
                    />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button
                            onClick={(e) => onButtonClicked()}
                            type="button"
                            className="inline-flex items-center justify-center rounded-2xl px-4 py-3 transition duration-500 ease-in-out text-white bg-customColor hover:bg-blue-900 focus:outline-none"
                        >
                            <span className="font-extrabold">SEND</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-6 w-6 ml-2 transform rotate-90"
                            >
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeChat