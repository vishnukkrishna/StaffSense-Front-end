import React, { useContext, useState, useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AuthContext from "../../components/Contexts/AuthContext";
import { BACKEND_BASE_URL, wsApiUrl } from "../../api/Api";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from "axios";
import AdminChatSearch from '../Admin/AdminChatSearch';

function AdminChat() {

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


    const { employeeId } = useParams();
    useEffect(() => {
        console.log(employeeId, 'emkdhfkfhkdkfd');
    })

    const setUserProfileDetails = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/user/userdetails/${user_id}/`
            );
            setRecipientDetails(response.data)
            console.log(response, "llllllllllllllllllllllll");
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const setSenderProfile = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/user/userdetails/${employeeId}/`
            );
            setSenderDetails(response.data)
            console.log(response, "eeeeeeeeeeeeeeeeeeeeeeeeeeee");
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
                console.log(response.data, "qwertyyyyyyyyyyyyyyyyy");
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
            console.log(dataFromServer, "dataFrommmmmmmmmmmmmmmmmmmmmmmmmmm");
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
        }
    }, [user]);

    useEffect(() => {
        if (userId && employeeId) {
            setSenderId(employeeId);
            setRecipientId(userId);
            setUpChat();
        }
    }, [userId, employeeId]);

    useEffect(() => {
        if (senderid != null && recipientid != null) {
            setUpChat()
        }
    }, [senderid, recipientid, employeeId])

    const onButtonClicked = () => {
        if (!clientstate || !clientstate.send || messageRef.current.value.trim() === "") {
            return;
        }

        console.log(messageRef.current.value, senderdetails.username, recipientdetails.username, "reachedddddddddddddddddd");

        clientstate.send(
            JSON.stringify({
                message: messageRef.current.value,
                senderUsername: recipientdetails.username,
                receiverUsername: senderdetails.username,
            })
        );

        messageRef.current.value = '';
    };

    return (
        <div className="w-9/12 border rounded lg:grid lg:grid-cols-3 m-3">
            <AdminChatSearch />
            <div className="hidden lg:col-span-2 lg:block">
                <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                        <img className="object-cover w-10 h-10 rounded-full"
                            src={BACKEND_BASE_URL+senderdetails.profile_pic} alt="username" />
                        <span className="block ml-2 font-bold text-gray-600">{senderdetails.first_name} {senderdetails.last_name}</span>
                        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                        </span>
                    </div>
                    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                        <ul className="space-y-2">
                            {

                                messages.map((message) => {
                                    console.log('recepedent,sender', recipientdetails, senderdetails);

                                    if (message.sender_username == senderdetails.username) {

                                        return (

                                            <li className="flex justify-start">
                                                <div>
                                                    <img
                                                        src={BACKEND_BASE_URL + senderdetails?.profile_pic}
                                                        alt="My profile"
                                                        className="w-7 h-7 rounded-full order-1"
                                                    />
                                                </div>
                                                <div className="relative max-w-xl px-6 py-2 text-gray-700 rounded-lg shadow">
                                                    <span className="block">{message.message}</span>
                                                </div>
                                            </li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li className="flex justify-end">
                                                <div className="relative max-w-xl px-6 py-2 text-gray-700 bg-gray-100 rounded-lg shadow">
                                                    <span className="block">{message.message}</span>
                                                </div>
                                                <div>
                                                    <img
                                                        src={BACKEND_BASE_URL + recipientdetails?.profile_pic}
                                                        className="w-7 h-7 rounded-full order-2"
                                                    />
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>

                    <div className="flex items-center justify-between w-full p-4 border-t border-gray-300 mt-12">
                        <input ref={messageRef} type="text" placeholder="Message"
                            className="block w-full py-3 pl-4 mx-4 bg-gray-200 rounded-full outline-none focus:text-gray-700"
                            name="message" required />
                        <button type="submit" onClick={(e) => onButtonClicked()}>
                            <svg className="w-8 h-8 text-customColor origin-center transform rotate-90"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminChat