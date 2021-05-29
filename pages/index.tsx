import Head from "next/head";
import { get } from "../src/Api";
import Page from "../src/components/Page";
import { useAppContext } from "../src/context/AppContext";
import { useUser } from "@auth0/nextjs-auth0";
import TickerSearch from "../src/components/TickerSearch";
import { useState } from "react";
import CandleStickChart from "../src/components/Charts/CandleStickChart";

export default function Home() {
    const [symbol, setSymbol] = useState("");
    return (
        <Page>
            <CandleStickChart symbol={symbol} />
            <TickerSearch onChange={setSymbol}/>
        </Page>
    );
}
