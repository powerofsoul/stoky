import { useRouter } from "next/router";
import React from "react";
import { Card, Grid, Loader } from "tabler-react";
import ChartFetcher from "../../src/components/Charts/ChartFetcher";
import LineChart from "../../src/components/Charts/LineChart";
import Page from "../../src/components/Page";
import Head from "next/head";
import { NextPageContext } from "next";
import Consts from "../../src/Consts";

const H = ({ symbol }: any) => (
    <Head>
        <title>{symbol}</title>
        <meta property="og:title" content={symbol.toLocaleUpperCase()} />
        <meta property="og:description" content={`Feed for ${symbol}`} />
        <meta property="og:image" content={`${Consts.url}/api/stock/${symbol}/preview`} />
        <meta name="twitter:image" content={`${Consts.url}/api/stock/${symbol}/preview`} />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
);

const StockPage = ({symbol} : any) => {
    if (!symbol) {
        return (
            <span>
                <H symbol={symbol} />
                <Loader />;
            </span>
        );
    }
    return (
        <Page>
            <H symbol={symbol} />
            <Grid.Row>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{symbol?.toUpperCase()}</Card.Title>
                            <ChartFetcher
                                symbol={symbol}
                                chartProps={{
                                    height: 200,
                                    xTicks: 2,
                                }}
                                Chart={LineChart}
                            />
                        </Card.Body>
                    </Card>
                </Grid.Col>
                <Grid.Col ignoreCol xs={12} sm={12} md={12} xl={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Feed</Card.Title>
                        </Card.Body>
                    </Card>
                </Grid.Col>
            </Grid.Row>
        </Page>
    );
};

StockPage.getInitialProps = async (ctx: NextPageContext) => {
    return { symbol: ctx.query.symbol };
};

export default StockPage;
