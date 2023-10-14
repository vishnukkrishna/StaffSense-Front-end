// React
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../../components/Contexts/AuthContext";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet'
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(`${BACKEND_BASE_URL}/user/login/`, user);

      toast.success("Login Successfully");
      localStorage.setItem("access_token", data.access_token);

      const tokenData = jwt_decode(data.access_token);

      const LoggedInUser = {
        name: tokenData.name,
        email: tokenData.email,
        is_active: tokenData.is_active,

        is_admin: tokenData.is_admin,
      };

      toast.success("Login Successfully");
      setUser(LoggedInUser);

      const accessToken = localStorage.getItem("access_token");

      navigate("/dashboard");
    } catch (error) {
      console.error("error in token fetch: ", error.message);
      console.log("error.response: ", error.response);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Helmet>
        <title>
          Admin Login | Staffsense
        </title>
      </Helmet>
      <ToastContainer />
      <div className="flex flex-col md:flex-row h-screen items-center">
        <div className="md:w-1/2 ml-4 md:ml-0">
          <img
            src={img}
            alt="Your Alt Text"
            className="w-full h-auto md:h-full object-cover max-w-full"
          />
        </div>
        <div className="md:w-1/2">
          <div className=" h-full flex-grow">
            <Card className="md:w-2/3 border md:mx-auto sm:w-full sm:mx-4 lg:w-1/2 xl:w-1/3 mt-8 md:mt-0">
              <CardHeader
                variant="gradient"
                className="mb-4 bg-transparent grid h-28 place-items-center mt-8 bg-customColor"
              >
                <Typography variant="h3" color="white">
                  Sign In
                </Typography>
              </CardHeader>
              <form action="" onSubmit={submit}>
                <CardBody className="flex flex-col gap-4 mt-16">
                  <div className="relative">
                    <Input
                      id="email"
                      value={email}
                      type="email"
                      label="Email"
                      size="lg"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      label="Password"
                      size="lg"
                      id="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {passwordVisible ? (
                        <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
                      ) : (
                        <AiOutlineEye onClick={togglePasswordVisibility} />
                      )}
                    </div>
                  </div>
                  {/* <h3 className="relative left-0  mt-6 md:text-right">
                Forgot your Password <span className="text-red-600">?</span>
              </h3> */}
                  <CardFooter className="pt-0 mt-6">
                    <Button className="bg-customColor drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110" type="submit" fullWidth>
                      Sign In
                    </Button>
                  </CardFooter>
                </CardBody>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
