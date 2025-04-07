import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    email : Yup.string().required('Please Enter Your Email'),
    password : Yup.string().min(4).required("Please Enter Your Password")
})