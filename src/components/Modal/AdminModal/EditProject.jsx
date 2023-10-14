import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FiEdit } from "react-icons/fi";

function EditProject({ id, onEditSubmission }) {
    const navigate = useNavigate();
    const handleOpen = () => setOpen(!open);
    const [employees, setEmployees] = useState([]);
    const [project, setProject] = useState({});
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        assignedTo: "",
    });

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedAssignedTo, setSelectedAssignedTo] = useState("");

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/project/projects/${id}`
                );
                axios
                    .get(`${BACKEND_BASE_URL}/user/employelist/`)
                    .then((response) => {
                        setEmployees(response.data);
                    })
                    .catch((error) => { });
                setProject(response.data);
                setFormData({
                    name: response.data.name || "",
                    description: response.data.description || "",
                    start_date: response.data.start_date || "",
                    end_date: response.data.end_date || "",
                    assignedTo: response.data.assignedTo || "",
                });
                setStartDate(response.data.start_date || "");
                setEndDate(response.data.end_date || "");
                setSelectedAssignedTo(response.data.assignedTo);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchProjectData();
    }, [id]);
    const handleAssignedToChange = (event) => {
        const selectedValue = event.target.value;
        setFormData({ ...formData, assignedTo: selectedValue });
    };


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;
        if (newStartDate > endDate) {
            toast.error("Start Date cannot be after End Date");
        } else {
            setStartDate(newStartDate);
            setFormData({ ...formData, [event.target.name]: newStartDate });
        }
    };

    const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;
        if (newEndDate < startDate) {
            toast.error("End Date cannot be before Start Date");
        } else {
            setEndDate(newEndDate);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const currentDate = new Date();
        if (new Date(formData.start_date) < currentDate) {
            toast.error("Passed date can't be the start date");
            return;
        }
        if (new Date(formData.start_date) > new Date(formData.end_date)) {
            toast.error("Start should be before the end date");
            return;
        }

        setFormData({ ...formData, ["start_date"]: endDateObj });
        setFormData({ ...formData, ["end_date"]: startDateObj });

        try {
            await axios.put(
                `${BACKEND_BASE_URL}/project/projects/${id}/`,
                formData
            );
            toast.success("Update Successfully");
            onEditSubmission();
            setOpen(false);
            navigate("/projectlist");
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("Failed");
        }
    };

    return (
        <>
            <FiEdit
                className="text-black text-3xl cursor-pointer"
                onClick={() => setOpen(true)}
            />

            <Dialog
                size="xs"
                open={open}
                handler={() => setOpen(false)}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >

                <DialogHeader>Edit Project</DialogHeader>
                <DialogBody divider className="font-fontHubballi text-xl">

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={project.name}
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
                                defaultValue={project.description}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full h-32"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">Assigned To</label>
                            <select
                                name="assignedTo"
                                value={selectedAssignedTo} // Use selectedAssignedTo for the default value
                                onChange={handleAssignedToChange} // Handle changes in the dropdown
                                className="border border-gray-300 rounded-md p-3 w-full"
                            >
                                <option value="">Select an employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                defaultValue={project.start_date}
                                onChange={handleStartDateChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                defaultValue={project.end_date}
                                onChange={handleEndDateChange}
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

export default EditProject;
