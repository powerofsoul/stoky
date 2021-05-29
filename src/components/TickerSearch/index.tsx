import { useEffect, useState } from "react";
import { Form } from "tabler-react";
import { useSearchSymbols } from "ticker-symbol-search";
import { MarketTypes } from "ticker-symbol-search/dist/types/markets";

const TickerSearch = () => {
    const [search, setSearch] = useState("");

    const { symbols, isSuccess, isLoading, isError } = useSearchSymbols(
        search,
        MarketTypes.ALL
    );

    useEffect(() => {
        console.log(symbols)
    }, [symbols])

    return (
        <Form.Input
            icon="search"
            position="prepend"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            tabIndex={-1}
            light
        />
    );
};

export default TickerSearch;