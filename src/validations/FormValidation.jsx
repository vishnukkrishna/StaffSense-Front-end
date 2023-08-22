import * as Yup from "yup";
export const EmployeeValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  department: Yup.string().required("Department is required"),
});

export const EmployeeLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // username: Yup.string().required('Username is required'),
  // password: Yup.string()
  //   .required('Password is required')
  //   .matches(
  //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //     'Password must contain at least 8 characters, one letter, and one number'
  //   ),
  password: Yup.string().test(
    "is-non-empty",
    "Password is required",
    (value) => value && value.trim() !== ""
  ),
});
