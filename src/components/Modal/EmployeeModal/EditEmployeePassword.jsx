import React, { useState, useContext } from "react";
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

function EditEmployeePassword() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const { user } = useContext(AuthContext);
    const [oldpass, setOldpass] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const ChangePass = async (e) => {
        e.preventDefault();
        // Password validation rules
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        try {
            if (pass1 === pass2) {
                if (!passwordPattern.test(pass1)) {
                    toast.error("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.");
                } else {
                    const response = await axios.post(`${BACKEND_BASE_URL}/user/changepass/`, {
                        oldpass,
                        password: pass1,
                        user_id: user.user_id,
                    });
                    console.log("Response:", response.data);

                    if (response.data.msg === 500) {
                        toast.error("Old Password Not match");
                    } else if (response.data.msg === 200) {
                        // Use toast.promise to wait for the success message
                        const successPromise = toast.promise(
                            () => new Promise((resolve) => {
                                e.target.reset();
                                localStorage.removeItem("access_token");
                                setUser(null);
                                resolve();
                            }),
                            {
                                pending: "Changing password...",
                                success: "Password changed",
                            }
                        );

                        // Wait for the success message to be displayed before navigating
                        await successPromise;
                        navigate("/user");
                    } else {
                        toast.error("Password change failed");
                    }
                }
            } else {
                toast.error("Passwords didn't match");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while changing the password.");
        }
    };



    return (
        <>
            <Button onClick={() => setOpen(true)} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-900 shadow hover:shadow-lg text-lg transition transform hover:-translate-y-0.5">
                Edit Password
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

                <DialogHeader>Edit Employee Password</DialogHeader>
                <DialogBody divider className="font-fontHubballi text-xl">
                    <form onSubmit={ChangePass}>
                        <div className="mb-4">
                            <label htmlFor="textareaField" className="block text-gray-700">
                                Old Password
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                placeholder="Enter old password"
                                onChange={(e) => setOldpass(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="last_name"
                                placeholder="Enter new password"
                                onChange={(e) => setPass1(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="confirm password"
                                onChange={(e) => setPass2(e.target.value)}
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
                <ToastContainer />
            </Dialog>
        </>
    )
}

export default EditEmployeePassword