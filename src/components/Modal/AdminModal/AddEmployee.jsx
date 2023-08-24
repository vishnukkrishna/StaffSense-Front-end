import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { BACKEND_BASE_URL } from "../../../api/Api";
import { toast, Toaster } from "react-hot-toast";
import { EmployeeValidationSchema } from "../../../validations/FormValidation";
import axios from "axios";

function AddEmployee() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const [isOpen, setIsOpen] = useState(false);
    const [departments, setDepartments] = useState([]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

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

    const handleSubmit = (values) => {

        console.log("welcomr", values);
        const generatedTemporaryPassword = Math.random().toString(36).slice(-8);

        console.log(generatedTemporaryPassword, "bbbbbbbbb");

        console.log(values.department, values.username, "xzxzxz");
        const employeeData = {
            department: values.department,
            username: values.username,
            email: values.email,

            temporaryPassword: generatedTemporaryPassword,
        };

        registerEmployee(employeeData);
        closeModal();
    };

    const registerEmployee = (employeeData) => {
        console.log("employeeData:", employeeData);

        axios
            .post(`${BACKEND_BASE_URL}/user/registration/`, employeeData)
            .then((response) => {
                if (response.status === 200) {
                    const tokens = response.data.tokens;
                    console.log("Tokens:", tokens);
                    toast.success("Employee added successfully");
                    setTimeout(() => {
                        closeModal();
                    }, 1000);
                } else {
                    console.log("Received unexpected status code:", response.status);
                    toast.error("Failed to add employee. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while adding the employee.");
            });
    };


    const formik = useFormik({
        initialValues: {
            department: "",
            username: "",
            email: "",
        },



        validationSchema: EmployeeValidationSchema,
        onSubmit: handleSubmit,
    });

    if (Object.keys(formik.errors).length > 0) {
        console.log("Validation failed. Errors:", formik.errors);
    } else {
        console.log("Validation passed. Submitting the form...");
    }


    return (
        <>
            <Button onClick={handleOpen} className="w-40 bg-indigo-500 text-center h-10">
                Add Employee
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
                <DialogHeader>Add Employee</DialogHeader>
                <DialogBody divider>
                    <form action="" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="inputField1" className="block text-gray-700">User Name</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className={`border border-gray-300 rounded-md p-2 w-full ${formik.errors.username && formik.touched.username
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                {...formik.getFieldProps("username")}
                            />
                            {formik.errors.username && formik.touched.username && (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.username}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="inputField2" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={`border border-gray-300 rounded-md p-2 w-full ${formik.errors.email && formik.touched.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Department</label>
                            <select
                                name="department"
                                id="department"
                                className={`border border-gray-300 rounded-md p-3 w-full ${formik.errors.department && formik.touched.department
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                {...formik.getFieldProps("department")}
                            >
                                <option value="option1">Select department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.department && formik.touched.department && (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.department}
                                </p>
                            )}
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

                <Toaster />
            </Dialog>
        </>
    );
}

export default AddEmployee;
