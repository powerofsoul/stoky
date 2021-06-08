import { FieldProps } from 'formik'
import { Form } from 'tabler-react'
import Select from 'react-select'
import TickerSearch from '../TickerSearch'
import GifSearchButton from '../GifSearchButton'

export const FormInput = ({ field, ...props }: any) => <Form.Input {...field} {...props} />

export const FormTextarea = ({ field, ...props }: any) => <Form.Textarea {...field} {...props} />

export const FormTickerSearch = ({ field, ...props }: any) => <TickerSearch {...field} {...props} />

export const FormSelect = ({ options, field, form }: any) => (
    <Select
        options={options}
        name={field.name}
        defaultValue={options ? options.find((option: any) => option.value === field.value) : ''}
        onChange={(option) => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
    />
)

export const FormGifSearchButton = ({ options, field, form }: any) => (
    <GifSearchButton onChange={(url) => form.setFieldValue(field.name, url)} />
)
