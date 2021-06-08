import { object, string } from 'yup'

export default object({
    symbol: string().required('Required'),
    message: string().required('Required').max(255, 'Too Long'),
    giphyId: string().optional(),
})
