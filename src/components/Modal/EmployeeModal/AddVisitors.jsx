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

function AddVisitors({ Action }) {
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

    // Step 1: Initialize formErrors state
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                organizer: user.username,
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        // Step 2: Clear validation errors for the corresponding input
        const updatedFormErrors = { ...formErrors };
        delete updatedFormErrors[e.target.name];

        const value =
            e.target.name === "organizer" ? user.username : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });

        // Step 2: Update formErrors state
        setFormErrors(updatedFormErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Step 4: Implement date and time validation
        const currentDate = new Date();
        const selectedDate = new Date(`${formData.date}T${formData.startTime}`);
        const endTime = new Date(`${formData.date}T${formData.endTime}`);

        const errors = {};

        if (!formData.date) {
            errors.date = "Date is required";
        } else if (selectedDate <= currentDate) {
            errors.date = "Date and time must be in the future";
        }

        if (!formData.startTime) {
            errors.startTime = "Start time is required";
        }

        if (!formData.endTime) {
            errors.endTime = "End time is required";
        } else if (endTime <= selectedDate) {
            errors.endTime = "End time must be after start time";
        }

        // Step 4: Set formErrors state with validation errors
        setFormErrors(errors);

        // Step 4: Check if there are any validation errors before submitting
        if (Object.keys(errors).length === 0) {
            const updatedFormData = {
                ...formData,
                organizerId: user.user_id,
            };

            axios
                .post(`${BACKEND_BASE_URL}/visitor/`, updatedFormData)
                .then((response) => {
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
                    setOpen(false);
                    Action()
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data);
                    } else {
                        toast.error("An error occurred");
                    }
                });
        }
    };

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
                                placeholder="Email"
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
                                className={`border border-gray-300 rounded-md p-2 w-full ${formErrors.date ? "border-red-500" : ""}`}
                            />
                            {/* Step 2: Display date validation error */}
                            {formErrors.date && (
                                <div className="text-red-500">{formErrors.date}</div>
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
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                                className={`border border-gray-300 rounded-md p-2 w-full ${formErrors.startTime ? "border-red-500" : ""}`}
                            />
                            {/* Step 2: Display start time validation error */}
                            {formErrors.startTime && (
                                <div className="text-red-500">{formErrors.startTime}</div>
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
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                                className={`border border-gray-300 rounded-md p-2 w-full ${formErrors.endTime ? "border-red-500" : ""}`}
                            />
                            {/* Step 2: Display end time validation error */}
                            {formErrors.endTime && (
                                <div className="text-red-500">{formErrors.endTime}</div>
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
                            >
                                <span>Submit</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
                <ToastContainer />
            </Dialog>
        </>
    )
}

export default AddVisitors
