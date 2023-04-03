import * as Yup from "yup";

export const registrationSchema = Yup.object({
  firstname: Yup.string()
    .min(2)
    .max(25)
    .required("Please Enter your First Name"),
  lastname: Yup.string().min(2).max(25).required("Please Enter your Last Name"),
  username: Yup.string().min(2).max(25).required("Please Enter your Username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  repassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
