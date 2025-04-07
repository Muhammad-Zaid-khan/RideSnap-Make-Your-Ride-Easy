import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    name : Yup.string().min(2).max(25).required("Please Enter your name"),
    email : Yup.string().required("  Please Enter your Email"),
    password : Yup.string().min(4).max(12).required("  Please Enter your Password"),
    confirm_password : Yup.string().oneOf([Yup.ref("password")], "Password Must be match" ),
    role : Yup.string().required("  Please Select your role")
});

