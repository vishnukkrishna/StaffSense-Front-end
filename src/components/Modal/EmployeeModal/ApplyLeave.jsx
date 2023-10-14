import React, { useState, useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import AuthContext from "../../Contexts/AuthContext";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ApplyLeave() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        leave_type: "Sick Leave",
        reason: "",
        start_date: "",
        end_date: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            employee: user.user_id,
        };

        const startDate = new Date(updatedFormData.start_date);
        const endDate = new Date(updatedFormData.end_date);
        const currentDate = new Date();

        if (startDate > endDate) {
            toast.error("Start date cannot be after end date.");
            return;
        }

        if (startDate < currentDate) {
            toast.error("Start date cannot be in the past.");
            return;
        }

        axios
            .post(`${BACKEND_BASE_URL}/leave/leaves/`, updatedFormData)
            .then((response) => {
                toast.success("Leave application submitted successfully!");

                setFormData({
                    leave_type: "Sick Leave",
                    reason: "",
                    start_date: "",
                    end_date: "",
                });
            })
            .catch((error) => {
                const responseData = error.response.data;
                if (responseData.error === "You cannot apply for leave in the past.") {
                    toast.error(
                        "You cannot apply for leave in the past. Please select a valid start date."
                    );
                } else if (
                    responseData.error ===
                    "You have already applied for leave during this period."
                ) {
                    toast.error("You have already applied for leave during this period.");
                } else {
                    toast.error(
                        "Failed to create leave request. Please try again later."
                    );
                }
            });
    };

    return (
        <>
            <div className="w-32 h-32">
                <Button onClick={handleOpen} className="w-36 bg-indigo-500 text-center h-10">
                    Apply Leave
                </Button>

                <Dialog
                    size="xs"
                    open={open}
                    handler={() => setOpen(false)}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Apply Leave</DialogHeader>
                    <DialogBody divider className="font-fontHubballi text-xl">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="inputField1" className="block text-gray-700">Leave Type</label>
                                <select
                                    name="leave_type"
                                    value={formData.leave_type}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-3 w-full"
                                >
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Vacation Leave">Vacation Leave</option>
                                    <option value="Personal Leave">Personal Leave</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="textareaField" className="block text-gray-700">
                                    Reason for leave
                                </label>
                                <textarea
                                    id="textareaField"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    placeholder="Enter your reason"
                                    className="border border-gray-300 rounded-md p-2 w-full h-32"
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="inputField3" className="block text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="inputField3" className="block text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
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
                                <Button className="bg-indigo-500" type="submit" onClick={handleOpen}>
                                    <span>Submit</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogBody>
                </Dialog>
            </div>
            <ToastContainer />
        </>
    );
}

export default ApplyLeave;
