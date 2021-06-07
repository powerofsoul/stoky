import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid } from 'tabler-react'

interface Props<T> {
    children: T[]
    fetchData: () => void
    refresh: () => void
    className?: string
    hasMore?: boolean
}

const AsyncScroll = <T extends JSX.Element>({ children, fetchData, refresh, className, hasMore }: Props<T>) => {
    const seenItAll = (
        <Grid.Row>
            <Grid.Col className="text-center">Yay! You have seen it all</Grid.Col>
        </Grid.Row>
    )

    const pullDownToRefresh = (
        <Grid.Row>
            <Grid.Col className="text-center">Pull down to refresh</Grid.Col>
        </Grid.Row>
    )

    const releaseToRefresh = (
        <Grid.Row>
            <Grid.Col className="text-center">Release to refresh</Grid.Col>
        </Grid.Row>
    )

    const loading = (
        <Grid.Row>
            <Grid.Col className="text-center">Loading</Grid.Col>
        </Grid.Row>
    )

    return (
        <InfiniteScroll
            dataLength={children.length}
            next={fetchData}
            hasMore={hasMore ?? true}
            loader={loading}
            endMessage={seenItAll}
            refreshFunction={refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={pullDownToRefresh}
            releaseToRefreshContent={releaseToRefresh}
            className={className}
        >
            {children}
        </InfiniteScroll>
    )
}

export default AsyncScroll
