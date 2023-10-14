import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../api/Api";
import { toast, ToastContainer } from "react-toastify";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function AddTask({ onChange }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    // const [refresh, setRefresh] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        assignedTo: "",
        description: "",
        start_date: "",
        end_date: "",
        project: "",
    });

    useEffect(() => {
        axios
            .get(`${BACKEND_BASE_URL}/user/employelist/`)
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => { });
        axios
            .get(`${BACKEND_BASE_URL}/project/projects/`)
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${BACKEND_BASE_URL}/project/tasks/`, formData)
            .then((response) => {
                onChange();
                toast.success("Task added successfully!");
            })
            .catch((error) => {
                toast.error("Failed to add Task. ");
                console.error(error);
            });
    };

    return (
        <>
            <Button onClick={handleOpen} className="w-40 bg-indigo-500 text-center h-10">
                Add Task
            </Button>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add Task</DialogHeader>
                <DialogBody divider className="font-fontHubballi text-lg font-semibold">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">Task Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">
                                Project
                            </label>
                            <select
                                name="project"
                                type="number"
                                value={formData.project}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-3 w-full"
                            >
                                <option value="">Select a project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">Assigned To</label>
                            <select
                                name="assignedTo"
                                type="number"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-3 w-full"
                            >
                                <option value="">Select a employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="textareaField" className="block text-gray-700">
                                Description
                            </label>
                            <textarea
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
    )
}

export default AddTask