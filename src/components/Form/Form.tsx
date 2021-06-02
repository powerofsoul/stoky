import { Form } from "tabler-react";

export const FormInput = ({
    field,
    ...props
}: any) => <Form.Input {...field} {...props} />;

export const FormTextarea = ({
    field,
    ...props
}: any) => <Form.Textarea {...field} {...props} />;
