import Select from 'react-select'
import { Form } from 'tabler-react'
import TickerSearch from '../TickerSearch'

export const FormInput = ({ field, ...props }: any) => <Form.Input {...field} {...props} />

export const FormTextarea = ({ field, ...props }: any) => <Form.Textarea {...field} {...props} />

export const FormTickerSearch = ({ field, ...props }: any) => <TickerSearch {...field} {...props} />
