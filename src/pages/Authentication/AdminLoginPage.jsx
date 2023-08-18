// React
import React, { useState } from "react";
// Material Tailwind
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
// Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// Images
import img from "../../images/hrms.png";

function AdminLoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="md:w-1/2 ml-20">
        <img
          src={img}
          alt="Your Alt Text"
          className="w-full h-auto md:h-full object-cover max-w-full"
        />
      </div>
      <div className=" h-full flex-grow">
        <Card className="md:w-1/2 md:h-3/5 md:mr-4 lg:mr-4 sm:ml-0 md:ml-60 sm:mt-0 md:mt-60">
          <CardHeader
            variant="gradient"
            // color="gray"
            className="mb-4 bg-transparent grid h-28 place-items-center mt-8 bg-customColor"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 mt-16">
            <div className="relative">
              <Input type="email" label="Email" size="lg" />
            </div>

            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                label="Password"
                size="lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {passwordVisible ? (
                  <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
                ) : (
                  <AiOutlineEye onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
            <h3 className="relative left-0  mt-6 md:text-right">
              Forgot your Password <span className="text-red-600">?</span>
            </h3>
          </CardBody>

          <CardFooter className="pt-0 mt-6">
            <Button className="bg-customColor" fullWidth>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AdminLoginPage;
