import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().email('please enter a valid email').required('please enter your email'),
    password: yup.string().required("No password provided")
    // .min(8, "Password is too short - should be 8 chars minimus"),
}).required();
export const registerSchema = yup.object({
    userName: yup.string().required('a user-name is required'),
    email: yup.string().email('please enter a valid email').required('please enter your email'),
    password: yup.string().required("No password provided").min(8, "Password is too short - should be 8 chars minimus")
})

export const videoSchema = yup.object({
    title: yup.string().min(3, "title too short").max(60, "title too long").required("video title is required"),
    desc: yup.string().max(1000),
    category: yup.string()
});
