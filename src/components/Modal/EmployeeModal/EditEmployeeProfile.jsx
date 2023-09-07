import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../api/Api";
import AuthContext from "../../Contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function EditEmployeeProfile({ Action }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const { user } = useContext(AuthContext);
    if (user) {
        var id = user.user_id;
    } else {
        console.log("OOps! No id gherw");
    }
    const Navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const [formData, setFormData] = useState({
        employee_name: "",
        department_name: "",
        contact_number: "",
        email_address: "",
        designation: "",
        employee_id: "",
        employee_username: "",
        employee_first_name: "",
        employee_last_name: "",
        contact_number: "",
    });

    const fetchDepartments = async () => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/user/departments/`);
            const data = response.data;
            setDepartments(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/user/details/${id}/`
                );
                const user = response.data;

                setFormData({
                    employee_id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,

                    department_id: user.department_id,
                    department_name: user.department_name,
                    contact_number: user.phone,
                    email_address: user.email,
                    designation: user.designation,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserDetails();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Phone number validation
        if (name === "contact_number") {
            const phoneNumberPattern = /^[0-9 -]{10}$/; // This regex pattern allows only 10-digit numbers

            if (!phoneNumberPattern.test(value)) {
                setPhoneNumberError("Please enter a valid 10-digit phone number.");
                toast.error("Please enter a valid 10-digit phone number."); // Toast error message
            } else {
                setPhoneNumberError(""); // Reset the error message if the format is valid
            }
        }



    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("username", formData.username);
            formDataToSend.append("first_name", formData.first_name);
            formDataToSend.append("last_name", formData.last_name);

            formDataToSend.append("department_id", formData.department_id);
            formDataToSend.append("phone", formData.contact_number);
            formDataToSend.append("email_address", formData.email_address);
            formDataToSend.append("designation", formData.designation);

            const response = await axios.put(
                `${BACKEND_BASE_URL}/user/edit/${id}/`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            Action()
            Navigate("/profileuser");

        } catch (error) {
            console.log(error);
            // Handle error
        }
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-900 shadow hover:shadow-lg text-lg transition transform hover:-translate-y-0.5">
                Edit Profle
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

                <DialogHeader>Edit Employee Details</DialogHeader>
                <DialogBody divider className="font-fontHubballi text-xl">
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        {/* <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">Employee Username</label>
                            <input
                                id="employee_username"
                                type="text"
                                name="employee_username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                readOnly
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div> */}
                        <div className="mb-4">
                            <label htmlFor="textareaField" className="block text-gray-700">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Last Name</label>
                            <input
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Contact Number</label>
                            <input
                                id="contact_number"
                                type="tel" // Change the input type to "tel"
                                name="contact_number"
                                pattern="[0-9]{10}" // Use the pattern attribute to enforce 10 digits
                                value={formData.contact_number}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                            {phoneNumberError && <p className="text-red-500">{phoneNumberError}</p>}
                        </div>


                        {/* <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Email Address</label>
                            <input
                                id="email_address"
                                type="email"
                                name="email_address"
                                value={formData.email_address}
                                onChange={handleChange}
                                required
                                readOnly
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div> */}
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Designation</label>
                            <input
                                id="designation"
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Department</label>
                            <select
                                name="department_id"
                                id="department"
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                onChange={handleChange}
                                value={formData.department_id} // Use the value prop to set the selected value
                            >
                                <option value="">Select department</option>
                                {departments.map((department) => (
                                    <option
                                        key={department.name}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>

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

export default EditEmployeeProfile