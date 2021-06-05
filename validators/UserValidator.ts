import { object, string } from 'yup'

export default object({
    username: string().required('Required').min(3, 'Too Short').max(100, 'Too Long'),
    firstName: string().nullable().required('Required').min(3, 'Too Short').max(20, 'Too Long'),
    lastName: string().nullable().required('Required').min(3, 'Too Short').max(20, 'Too Long'),
    location: string().optional().max(50, 'Too Long'),
    aboutMe: string().optional().max(255, 'Too Long'),
})
