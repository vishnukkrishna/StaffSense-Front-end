import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import AuthContext from "../../Contexts/AuthContext";
import { BACKEND_BASE_URL } from '../../../api/Api';

function AddComplaint() {
    const { user } = useContext(AuthContext);
    const handleOpen = () => setOpen(!open);
    const [formData, setFormData] = useState({
        employee: user?.user_id || "",
        username: user?.username || "",
        email: user?.email || "",
        description: "",
    });

    console.log(user, "im hereeeee");

    useEffect(() => {
        setFormData({
            employee: user?.user_id || "",
            username: user?.username || "",
            email: user?.email || "",
            description: "",
        });
    }, [user]);

    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            const dataToSend = {
                employee: formData.employee,
                description: formData.description,
                is_present: true,
            };
            console.log(dataToSend, "form contains data");
            const response = await axios.post(
                `${BACKEND_BASE_URL}/complaint/complaints/`,
                dataToSend
            );
            console.log(response.data);
            toast.success("Complaint submitted successfully");
            setFormData({
                ...formData,
                description: "",
            });

            setRefresh(!refresh);
        } catch (error) {
            toast.error("Failed to submit complaint");
            console.error(error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    return (
        <>
            {/* <ToastContainer /> */}
            <Button onClick={handleOpen} className="w-40 bg-indigo-500 text-clip h-12">
                Add Complaints
            </Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add Complaints</DialogHeader>
                <DialogBody divider className='font-fontHubballi font-bold text-lg'>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Employee id</label>
                            <input
                                id="employee"
                                type="text"
                                name="employee"
                                value={formData.employee}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Employee Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Complaint</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full h-32"
                            ></textarea>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button type="submit" className="bg-indigo-500" onClick={handleOpen}>
                                <span>Submit</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default AddComplaint