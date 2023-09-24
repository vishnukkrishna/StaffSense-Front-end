import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../api/Api";

function EditMeeting({ id, Action }) {
    const [open, setOpen] = useState(false);
    const [meeting, setMeeting] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        organizer: "",
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchMeetingData = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/meeting/meetings/${id}`
                );
                setMeeting(response.data);
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    date: response.data.date,
                    start_time: response.data.start_time,
                    end_time: response.data.end_time,
                    organizer: response.data.organizer,
                });
            } catch (error) {
                console.error("Error fetching meeting data:", error);
            }
        };

        fetchMeetingData();
    }, [id]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                await axios.put(
                    `${BACKEND_BASE_URL}/meeting/meetings/${id}/`,
                    formData
                );
                toast.success("Meeting updated successfully");
                Action();
                setOpen(false);
            } catch (error) {
                console.error("Error updating meeting:", error);
                toast.error("Failed to update meeting. Please try again.");
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        const currentDate = new Date();
        const selectedDate = new Date(`${formData.date}T${formData.start_time}`);
        const endTime = new Date(`${formData.date}T${formData.end_time}`);

        if (!formData.title.trim()) {
            errors.title = "Title is required";
        }

        if (!formData.date) {
            errors.date = "Date is required";
        } else if (selectedDate <= currentDate) {
            errors.date = "Date and time must be in the future";
        }

        if (!formData.start_time) {
            errors.start_time = "Start time is required";
        }

        if (!formData.end_time) {
            errors.end_time = "End time is required";
        } else if (endTime <= selectedDate) {
            errors.end_time = "End time must be after start time";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    if (!meeting) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FiEdit
                onClick={() => setOpen(true)}
                className="text-black text-2xl cursor-pointer"
            />
            <Dialog
                size="sm"
                open={open}
                handler={() => setOpen(false)}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Edit Meeting</DialogHeader>
                <DialogBody
                    divider
                    className="font-fontHubballi font-bold text-lg"
                >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className={`border ${formErrors.title ? "border-red-500" : "border-gray-300"
                                    } rounded-md p-2 w-full`}
                            />
                            {formErrors.title && (
                                <p className="text-red-500">{formErrors.title}</p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={`border ${formErrors.description ? "border-red-500" : "border-gray-300"
                                    } rounded-md p-2 w-full h-32`}
                            ></textarea>
                            {formErrors.description && (
                                <p className="text-red-500">
                                    {formErrors.description}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className={`border ${formErrors.date ? "border-red-500" : "border-gray-300"
                                    } rounded-md p-2 w-full`}
                            />
                            {formErrors.date && (
                                <p className="text-red-500">{formErrors.date}</p>
                            )}
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
                                id="start_time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                required
                                className={`border ${formErrors.start_time ? "border-red-500" : "border-gray-300"
                                    } rounded-md p-2 w-full`}
                            />
                            {formErrors.start_time && (
                                <p className="text-red-500">
                                    {formErrors.start_time}
                                </p>
                            )}
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
                                id="end_time"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                                required
                                className={`border ${formErrors.end_time ? "border-red-500" : "border-gray-300"
                                    } rounded-md p-2 w-full`}
                            />
                            {formErrors.end_time && (
                                <p className="text-red-500">
                                    {formErrors.end_time}
                                </p>
                            )}
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
                            <Button type="submit" className="bg-indigo-500">
                                <span>Submit</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
                <ToastContainer />
            </Dialog>
        </>
    );
}

export default EditMeeting;
