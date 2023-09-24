import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import AuthContext from "../../Contexts/AuthContext";
import { BACKEND_BASE_URL } from '../../../api/Api';
import axios from "axios";

function AddVisitors() {
    const [open, setOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        reason: "",
        date: "",
        startTime: "",
        endTime: "",
        organizer: "",
    });

    useEffect(() => {
        if (user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                organizer: user.username,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const value =
            e.target.name === "organizer" ? user.username : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFormData = {
            ...formData,
            organizerId: user.user_id,
        };

        setShowSpinner(true);

        axios
            .post(`${BACKEND_BASE_URL}/visitor/`, updatedFormData)
            .then((response) => {
                console.log(response.data);
                toast.success(response.data.message);

                setFormData({
                    name: "",
                    reason: "",
                    email: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    organizer: user.username,
                });
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    toast.error("An error occurred");
                }
            });
    };

    // const validateForm = () => {
    //     const errors = {};
    //     const currentDate = new Date();
    //     const selectedDate = new Date(`${formData.date}T${formData.start_time}`);
    //     const endTime = new Date(`${formData.date}T${formData.end_time}`);

    //     if (!formData.title.trim()) {
    //         errors.title = "Title is required";
    //     }

    //     if (!formData.date) {
    //         errors.date = "Date is required";
    //     } else if (selectedDate <= currentDate) {
    //         errors.date = "Date and time must be in the future";
    //     }

    //     if (!formData.start_time) {
    //         errors.start_time = "Start time is required";
    //     }

    //     if (!formData.end_time) {
    //         errors.end_time = "End time is required";
    //     } else if (endTime <= selectedDate) {
    //         errors.end_time = "End time must be after start time";
    //     }

    //     setFormErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };

    return (
        <>
            <ToastContainer />
            <Button onClick={() => setOpen(true)} className="w-40 bg-indigo-500 text-clip h-12">
                Add Visitors
            </Button>
            <Dialog
                size="sm"
                open={open}
                handler={() => setOpen(false)}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add Visitors</DialogHeader>
                <DialogBody
                    divider
                    className="font-fontHubballi font-bold text-lg"
                >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-gray-700"
                            >
                                Reason For visit
                            </label>
                            <textarea
                                name="reason"
                                placeholder="Reason for Visit"
                                value={formData.reason}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full h-32"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="start_time"
                                className="block text-gray-700"
                            >
                                Starting Time
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="end_time"
                                className="block text-gray-700"
                            >
                                Ending Time
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => setOpen(false)}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type="submit"
                                className="bg-indigo-500"
                            >
                                <span>Submit</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default AddVisitors