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

function AddMeeting({ Action }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                organizer: user.username,
            }));
        }
    }, [user]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        organizer: user ? user.username : null,
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear any previous validation errors when the user makes changes.
        setFormErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const organizerId = user.user_id;
                const updatedFormData = {
                    ...formData,
                    organizer: organizerId,
                };
                await axios.post(
                    `${BACKEND_BASE_URL}/meeting/meetings/`,
                    updatedFormData
                );
                Action();

                setFormData({
                    title: "",
                    description: "",
                    date: "",
                    start_time: "",
                    end_time: "",
                    organizer: "",
                });
                toast.success("Meeting added successfully");

            } catch (error) {
                console.error(error);
                toast.error("Failed to add meeting. Please try again.");
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        const currentDate = new Date();
        const selectedDate = new Date(formData.date);
        const startTime = new Date(`1970-01-01T${formData.start_time}`);
        const endTime = new Date(`1970-01-01T${formData.end_time}`);

        if (!formData.title.trim()) {
            errors.title = "Title is required";
        }

        if (!formData.date) {
            errors.date = "Date is required";
        } else if (selectedDate < currentDate) {
            errors.date = "Date must be in the future";
        }

        if (!formData.start_time) {
            errors.start_time = "Start time is required";
        }

        if (!formData.end_time) {
            errors.end_time = "End time is required";
        } else if (endTime <= startTime) {
            errors.end_time = "End time must be after start time";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <>
            <ToastContainer />
            <Button onClick={() => setOpen(true)} className="w-40 bg-indigo-500 text-clip h-12">
                Add Meeting
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
                <DialogHeader>Add Meeting</DialogHeader>
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
                                placeholder="Title"
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
                                placeholder="Description"
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
                            <Button
                                type="submit"
                                className="bg-indigo-500"
                                onClick={handleOpen}
                            >
                                <span>Submit</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default AddMeeting;
