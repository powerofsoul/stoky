import { remove, sortBy } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'
import { CircleMinus, DragDrop } from 'tabler-icons-react'
import { Card, Grid, Button, Loader } from 'tabler-react'
import { getWatchlistApi } from '../../../pages/api/watchlist'
import { del, get, post } from '../../Api'
import { symbolLink } from '../../Links'
import { ReturnOfPromise, ThenArg } from '../../TypingUtils'
import ChartFetcher from '../Charts/ChartFetcher'
import LineChart from '../Charts/LineChart'
import TickerSearch from '../TickerSearch'
import ValueBadge from '../ValueBadge'

const LOCAL_STORAGE_WATCHLIST_KEY = 'watchlist_local_storage'

const WatchList = () => {
    const [symbols, setSymbols] = useState<ReturnOfPromise<typeof getWatchlistApi>>([])
    const [loading, setLoading] = useState(true)

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const getWatchList = async () => {
        const response = await get<ReturnType<typeof getWatchlistApi>>('watchlist')

        const order = window?.localStorage.getItem(LOCAL_STORAGE_WATCHLIST_KEY)
        if (order) {
            try {
                const orderObj: any[] = JSON.parse(order)
                setSymbols(sortBy(response, (e) => orderObj.findIndex((o) => o === e.symbol)))
            } catch {
                setSymbols(response)
            }
        } else {
            setSymbols(response)
        }
        setLoading(false)
    }

    useEffect(() => {
        getWatchList()
    }, [])

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return
        }

        const order = reorder(symbols, result.source.index, result.destination.index)

        window?.localStorage.setItem(LOCAL_STORAGE_WATCHLIST_KEY, JSON.stringify(order.map((item) => item.symbol)))

        setSymbols(order)
    }

    const removeFromWatchlist = async (index: number) => {
        try {
            const { symbol } = symbols[index]
            await del('watchlist', { symbol })
            setSymbols([...symbols.slice(0, index), ...symbols.slice(index + 1)])
        } catch {
            toast('Something went wrong', {
                type: 'error',
            })
        }
    }

    const Header = ({ onSymbolAdded }: { onSymbolAdded: (symbol: string) => void }) => {
        const [symbol, setSymbol] = useState<string>()

        const addToWatchList = async (s: string) => {
            if (symbols.find((e) => e.symbol === s)) return

            try {
                await post('watchlist', { symbol: s })
                onSymbolAdded(s)
                toast(`${s} added to watchlist`, {
                    type: 'success',
                })
            } catch {
                toast('Something went wrong', {
                    type: 'error',
                })
            }
        }

        return (
            <Grid.Row className="mb-3">
                <Grid.Col>
                    <TickerSearch onChange={setSymbol} />
                </Grid.Col>
                <Grid.Col>
                    <Button type="primary" onClick={() => symbol && addToWatchList(symbol)}>
                        Add
                    </Button>
                </Grid.Col>
            </Grid.Row>
        )
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>My watch list</Card.Title>
                <Header onSymbolAdded={getWatchList} />
                {loading && <Loader className="m-auto" />}
                {!loading && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(p) => (
                                <div {...p.droppableProps} ref={p.innerRef}>
                                    {symbols?.map((item, index) => (
                                        <Draggable key={item.symbol} draggableId={item.symbol} index={index}>
                                            {(p2) => (
                                                <div ref={p2.innerRef} {...p2.draggableProps} {...p2.dragHandleProps}>
                                                    <Card>
                                                        <Card.Body>
                                                            <Grid.Row>
                                                                <Grid.Col ignoreCol className="col-xs-1">
                                                                    <DragDrop />
                                                                </Grid.Col>
                                                                <Grid.Col className="float-left">
                                                                    <Grid.Row>
                                                                        <Grid.Col>
                                                                            <a href={symbolLink(item.symbol)}>
                                                                                ${item.symbol}
                                                                            </a>
                                                                        </Grid.Col>
                                                                    </Grid.Row>
                                                                    <Grid.Row>
                                                                        <Grid.Col>
                                                                            <ValueBadge
                                                                                prefix={`${item.price.regularMarketPrice} (`}
                                                                                value={
                                                                                    item.price
                                                                                        .regularMarketChangePercent *
                                                                                    100
                                                                                }
                                                                                suffix="%)"
                                                                                precision={2}
                                                                            />
                                                                        </Grid.Col>
                                                                    </Grid.Row>
                                                                </Grid.Col>
                                                                <Grid.Col>
                                                                    <ChartFetcher
                                                                        symbol={item.symbol}
                                                                        chartProps={{
                                                                            hideAxis: true,
                                                                            height: 70,
                                                                            width: 300,
                                                                        }}
                                                                        Chart={LineChart}
                                                                        startDate={moment().subtract(14, 'd').toDate()}
                                                                    />
                                                                </Grid.Col>
                                                            </Grid.Row>

                                                            <CircleMinus
                                                                className="pointer close-button"
                                                                color="red"
                                                                onClick={() => removeFromWatchlist(index)}
                                                            />
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {p.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </Card.Body>
        </Card>
    )
}

export default WatchList
