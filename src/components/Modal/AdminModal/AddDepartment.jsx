import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BACKEND_BASE_URL } from '../../../api/Api';

function AddDepartment({ onDepartmentAdded }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [departmentName, setDepartmentName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    axios.post(`${BACKEND_BASE_URL}/user/add_department/`, { name: departmentName })
      .then((response) => {
        if (response.status === 201) {
          // setSuccessMessage('Department added successfully.');
          onDepartmentAdded(response.data);
          handleOpen()
          toast.success("Add Department Successfully");
        } else {
          setErrorMessage('Error adding department.');
        }
      })
      .catch((error) => {
        toast.error("Failed");
        setErrorMessage('Error adding department.');
      });
  };
  return (
    <>
      <ToastContainer />
      <Button onClick={handleOpen} className="w-40 bg-indigo-500 text-center h-10">
        Add Department
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
        <DialogHeader>Add Department</DialogHeader>
        <DialogBody divider className='font-fontHubballi font-bold text-lg'>
          <div>
            <label htmlFor="inputField3" className="block text-gray-700">Department Name</label>
            <input
              type="text"
              id="inputField3"
              name="field3"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="bg-indigo-500" onClick={handleSubmit}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </>
  )
}

export default AddDepartment