import { PortfolioEventEnum } from '@prisma/client'
import { Field, FieldArray, Formik } from 'formik'
import { CircleMinus, CirclePlus } from 'tabler-icons-react'
import { Grid, Form, Button } from 'tabler-react'
import { FormInput, FormTextarea } from '../Form/Form'
import TickerSearch from '../TickerSearch'

const Portfolio = () => {
    const actionOptions = Object.entries(PortfolioEventEnum || {}).map((e) => ({
        label: e[0],
        value: e[1],
    }))

    const onSubmit = () => {}
    const initialValues = {
        tickers: [
            {
                symbol: '',
                price: undefined,
                amount: undefined,
            },
        ],
        message: '',
    }
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ errors, isSubmitting, handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldArray
                            name="tickers"
                            render={(arrayHelpers) =>
                                values.tickers.map((t, i) => (
                                    <Grid.Row>
                                        <Grid.Col>
                                            <Form.Group>
                                                <Form.Label>Ticker</Form.Label>
                                                <Field
                                                    name={`tickers.${i}.symbol`}
                                                    component={TickerSearch}
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col>
                                            <Form.Group>
                                                <Form.Label>Price</Form.Label>
                                                <Field
                                                    type="number"
                                                    placeholder="Price"
                                                    name={`tickers.${i}.price`}
                                                    component={FormInput}
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col>
                                            <Form.Group>
                                                <Form.Label>Amount</Form.Label>
                                                <Field
                                                    type="number"
                                                    placeholder="Amount"
                                                    name={`tickers.${i}.amount`}
                                                    component={FormInput}
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col auto>
                                            <Form.Group>
                                                <Form.Label>Actions</Form.Label>
                                                {i > 0 && (
                                                    <CircleMinus
                                                        className="float-right pointer m-auto"
                                                        size={28}
                                                        strokeWidth={1}
                                                        color="#862d2d"
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                i
                                                            )
                                                        }
                                                    />
                                                )}
                                                {i === 0 && (
                                                    <CirclePlus
                                                        className="float-right pointer m-auto"
                                                        size={28}
                                                        strokeWidth={1}
                                                        color="#2d8670"
                                                        onClick={() =>
                                                            arrayHelpers.insert(
                                                                i,
                                                                {}
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Form.Group>
                                        </Grid.Col>
                                    </Grid.Row>
                                ))
                            }
                        />
                        <Grid.Row className="mt-3">
                            <Grid.Col>
                                <Form.Group>
                                    <Form.Label>Post Message</Form.Label>
                                    <Field
                                        placeholder="Message"
                                        name="message"
                                        error={errors.message}
                                        component={FormTextarea}
                                    />
                                </Form.Group>
                            </Grid.Col>
                        </Grid.Row>
                        <Grid.Row className="mt-3">
                            <Grid.Col>
                                <Button type="submit" color="primary">
                                    Add
                                </Button>
                            </Grid.Col>
                        </Grid.Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Portfolio
