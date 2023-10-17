import React, { useState, useEffect, useContext } from "react";
import { EmployeeLoginSchema } from "../../validations/FormValidation";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../components/Contexts/AuthContext";
import jwt_decode from "jwt-decode";
import { BACKEND_BASE_URL } from "../../api/Api";
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
import img from "../../images/login.png";

function EmployeeLoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["jwt_token"]);
  const [loading, setLoading] = useState(true);
  const [verificationError, setVerificationError] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    const userId = new URLSearchParams(location.search).get("user_id");

    if (token && userId) {
      verifyToken(token, userId);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = (emailToken, userId) => {
    axios
      .post(`${BACKEND_BASE_URL}/user/verify-token/`, {
        token: emailToken,
        user_id: userId,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.valid) {
          setLoading(false);
          navigate("/user");
        } else {
          setVerificationError(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        setVerificationError(true);
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: EmployeeLoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    var email = values["email"];
    var password = values["password"];
    axios
      .post(`${BACKEND_BASE_URL}/user/userlogin/`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.is_blocked) {
          toast.error(
            "Your account is blocked. Please contact the administrator."
          );
        } else if (response.data.error) {
          toast.error("Incorrect email or password. Please try again.");
        } else {
          localStorage.setItem("access_token", response.data.access_token);

          const tokenData = jwt_decode(response.data.access_token);
          const LoggedInUser = {
            name: tokenData.name,
            email: tokenData.email,
            is_active: tokenData.is_active,
            department: tokenData.department,
            is_admin: tokenData.is_admin,
            user_id: tokenData.user_id,
          };

          setUser(LoggedInUser);

          const access_token = localStorage.getItem("access_token");

          navigate("/home");
          toast.success("Successfully logged")
        }
      })
      .catch((error) => {
        toast.error("Invalid Password or username");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (verificationError) {
    return <div>Error: Invalid token.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Employee Login | Staffsense</title>
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
          <div className="h-full flex-grow">
            <Card className="md:w-2/3 border md:mx-auto sm:w-full sm:mx-4 lg:w-1/2 xl:w-1/3 mt-8 md:mt-0">
              <CardHeader
                variant="gradient"
                className="mb-4 bg-customColor grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Sign In
                </Typography>
              </CardHeader>
              <form onSubmit={formik.handleSubmit}>
                <CardBody className="flex flex-col gap-4 mt-4 md:mt-16">
                  <div className="relative">
                    <Input
                      type="email"
                      label="Email"
                      size="lg"
                      name="email"
                      id="email"
                      {...formik.getFieldProps("email")}
                      className={
                        formik.errors.email && formik.touched.email
                          ? "form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"
                          : "form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      }
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      label="Password"
                      id="password"
                      name="password"
                      size="lg"
                      className={
                        formik.errors.password && formik.touched.password
                          ? "form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-red-500"
                          : "form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      }
                      {...formik.getFieldProps("password")}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.password}
                      </p>
                    )}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {passwordVisible ? (
                        <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
                      ) : (
                        <AiOutlineEye onClick={togglePasswordVisibility} />
                      )}
                    </div>
                  </div>

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

export default EmployeeLoginPage;
