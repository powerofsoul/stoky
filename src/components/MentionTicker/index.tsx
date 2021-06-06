import { Field, Formik } from 'formik'
import { toast } from 'react-toastify'
import { Grid, Card, Button, Form } from 'tabler-react'
import MentionTickerValidator from '../../../validators/MentionTickerValidator'
import { post } from '../../Api'
import { FormTextarea, FormTickerSearch } from '../Form/Form'

interface Props {
    symbol?: string
}

const MentionTicker = ({ symbol: s }: Props) => {
    const initialValues = {
        message: '',
        symbol: s,
    }

    const onSubmit = async (values: typeof initialValues) => {
        try {
            await post(`stock/${values.symbol}/mention`, values)
            toast('Comment posted', {
                type: 'success',
            })
        } catch {
            toast('Something went wrong', {
                type: 'error',
            })
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Comment</Card.Title>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={MentionTickerValidator}>
                    {({ errors, isSubmitting, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            {!s && (
                                <Grid.Row className="mb-3">
                                    <Grid.Col>
                                        <Field name="symbol" error={errors.symbol} component={FormTickerSearch} />
                                    </Grid.Col>
                                </Grid.Row>
                            )}
                            <Grid.Row>
                                <Grid.Col>
                                    <Field name="message" error={errors.message} component={FormTextarea} />
                                </Grid.Col>
                            </Grid.Row>
                            <Grid.Row className="mt-3">
                                <Grid.Col>
                                    <Button type="submit" color="primary" disabled={isSubmitting}>
                                        Post
                                    </Button>
                                </Grid.Col>
                            </Grid.Row>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )
}

export default MentionTicker
