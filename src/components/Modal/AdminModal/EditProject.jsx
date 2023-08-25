import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../api/Api";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";

function EditProject({ id, onEditSubmission }) {
    // const { projectId } = useParams();
    console.log("ID received:", id);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(!open);
    const [project, setProject] = useState({});
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
    });

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/project/projects/${id}`
                );
                console.log(response.data, "ghghghghghghghg");
                setProject(response.data);
                setFormData({
                    name: response.data.name || "",
                    description: response.data.description || "",
                    start_date: response.data.start_date || "",
                    end_date: response.data.end_date || "",
                });
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchProjectData();
    }, [id]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(
                `${BACKEND_BASE_URL}/project/projects/${id}/`,
                formData
            );
            console.log("Project updated successfully");
            onEditSubmission();
            setOpen(false);
            navigate("/projectlist");
        } catch (error) {
            console.error("Error updating project:", error);
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
                <DialogBody divider>

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

                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                defaultValue={project.start_date}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                defaultValue={project.end_date}
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

export default EditProject