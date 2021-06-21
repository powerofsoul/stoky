import { object, string, array, number, ref } from 'yup'

const validator = object({
    email: string().required('Email is required').email('Invalid email'),
    password: string().required('Password is required'),
})

export default validator
