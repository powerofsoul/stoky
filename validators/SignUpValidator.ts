import { object, string, array, number, ref } from 'yup'

const validator = object({
    email: string().required('Email is required').email('Invalid email'),
    username: string().required('Username is required').min(6, 'Username is too short').max(20, 'Username is too long'),
    password: string().required('Password is required').min(7, 'Password is too short').max(15, 'Password is too long'),
    confirmPassword: string().oneOf([ref('password'), null], 'Passwords must match'),
})

export default validator
