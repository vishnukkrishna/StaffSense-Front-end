import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Navigate } from "react-router-dom";
import { BACKEND_BASE_URL } from '../../../api/Api';

function AddAnnouncement({ Action }) {
    const [event, setEvent] = useState("");
    const [notes, setNotes] = useState("");
    const [open, setOpen] = React.useState(false);

    // const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "event") {
            setEvent(value);
        } else if (name === "notes") {
            setNotes(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("event", event);
        form.append("note", notes);

        try {
            const res = await axios.post(
                `${BACKEND_BASE_URL}/user/announcements/`,
                form
            );
            console.log(res.data);
            Action()
            Navigate("/announcement");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} className="w-40 bg-indigo-500 text-clip h-12">
                Add Announcment
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
                <DialogHeader>Add Announcement</DialogHeader>
                <DialogBody divider className='font-fontHubballi font-bold text-lg'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700"> Event</label>
                            <input
                                type="text"
                                name="event"
                                id="event"
                                value={event}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputField3" className="block text-gray-700"> Notes</label>
                            <input
                                type="text"
                                name="notes"
                                id="notes"
                                value={notes}
                                onChange={handleInputChange}
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
                            <Button type="submit" className="bg-indigo-500" onClick={handleOpen}>
                                <span>Submit</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    )
}

export default AddAnnouncement