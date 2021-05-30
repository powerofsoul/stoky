import { useRouter } from "next/router";
import React from "react";
import { Card, Grid, Loader } from "tabler-react";
import ChartFetcher from "../../src/components/Charts/ChartFetcher";
import LineChart from "../../src/components/Charts/LineChart";
import Page from "../../src/components/Page";

const StockPage = () => {
    const router = useRouter();
    const symbol = router.query.symbol as string;
    if (!symbol) {
        return <Loader />;
    }
    return (
        <Page>
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

export default StockPage;
