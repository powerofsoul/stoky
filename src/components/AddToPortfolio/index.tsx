import { PortfolioEventEnum, PortfolioTicker } from '@prisma/client'
import { Field, FieldArray, Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import { CircleMinus, CirclePlus } from 'tabler-icons-react'
import { Grid, Form, Button, Card } from 'tabler-react'
import UpdatePortfolioValidator from '../../../validators/UpdatePortfolioValidator'
import { post } from '../../Api'
import { useAppContext } from '../../context/AppContext'
import BuySellToggle from '../BuySellToggle'
import { FormBuySellToggle, FormInput, FormTextarea, FormTickerSearch } from '../Form/Form'

const Portfolio = () => {
    const { setPortfolioTickers } = useAppContext()

    const initialValues = {
        tickers: [
            {
                symbol: '',
                price: undefined,
                amount: undefined,
                action: 'BUY',
            },
        ],
        message: '',
    }

    const onSubmit = async (data: typeof initialValues) => {
        try {
            const response = await post<PortfolioTicker[], typeof data>('portfolio', data)
            if (response !== undefined) {
                setPortfolioTickers(response)
            }

            toast('Success', {
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
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={UpdatePortfolioValidator}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ errors, isSubmitting, handleSubmit, values, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <FieldArray
                                name="tickers"
                                render={(arrayHelpers) =>
                                    values.tickers.map((t, i) => (
                                        <Grid.Row key={i}>
                                            <Grid.Col>
                                                <Form.Group>
                                                    <Form.Label>Ticker</Form.Label>
                                                    <Field
                                                        error={
                                                            // @ts-ignore
                                                            errors.tickers?.[i]?.symbol
                                                        }
                                                        name={`tickers.${i}.symbol`}
                                                        component={FormTickerSearch}
                                                    />
                                                </Form.Group>
                                            </Grid.Col>
                                            <Grid.Col>
                                                <Form.Group>
                                                    <Form.Label>Price</Form.Label>
                                                    <Field
                                                        type="number"
                                                        placeholder="Price"
                                                        // @ts-ignore
                                                        error={
                                                            // @ts-ignore
                                                            errors.tickers?.[i]?.price
                                                        }
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
                                                        error={
                                                            // @ts-ignore
                                                            errors.tickers?.[i]?.amount
                                                        }
                                                        name={`tickers.${i}.amount`}
                                                        component={FormInput}
                                                    />
                                                </Form.Group>
                                            </Grid.Col>
                                            <Grid.Col auto>
                                                <Form.Group>
                                                    <Form.Label>Action</Form.Label>
                                                    <Field
                                                        type="action"
                                                        name={`tickers.${i}.action`}
                                                        component={FormBuySellToggle}
                                                    />
                                                </Form.Group>
                                            </Grid.Col>
                                            <Grid.Col auto>
                                                <Form.Group>
                                                    <Form.Label>&nbsp;</Form.Label>
                                                    {values.tickers.length > 1 && (
                                                        <CircleMinus
                                                            className="float-right pointer m-auto"
                                                            size={28}
                                                            strokeWidth={1}
                                                            color="#b93939"
                                                            onClick={() => arrayHelpers.remove(i)}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Grid.Col>
                                        </Grid.Row>
                                    ))
                                }
                            />
                            <Grid.Row>
                                <Grid.Col>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('tickers', [...values.tickers, {}], false)
                                        }}
                                    >
                                        Insert row
                                    </Button>
                                </Grid.Col>
                            </Grid.Row>
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
                                    <Button type="submit" color="primary" disabled={isSubmitting}>
                                        Add
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

export default Portfolio
