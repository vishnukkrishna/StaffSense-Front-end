import React, { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function AddProject() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URL}/project/projects/`,
                formData
            );
            onChange();
            toast.success("Project added successfully!");
        } catch (error) {
            console.error("Error creating project:", error);

            if (error.response && error.response.data && error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("Failed to add project. Please try again later.");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <Button onClick={handleOpen} className="w-40 bg-indigo-500 text-center h-10">
                Add Project
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
                <DialogHeader>Add Project</DialogHeader>
                <DialogBody divider className="font-fontHubballi font-bold text-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="textareaField" className="block text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="textareaField"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
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
        </>
    );
}

export default AddProject;
