import { useState } from "react";
import Select from "react-select";
import { useSearchSymbols } from "ticker-symbol-search";
import { MarketTypes } from "ticker-symbol-search/dist/types/markets";
import { Badge } from "tabler-react";

interface Props {
    onChange?: (symbol: string) => void;
}

const TickerSearch = ({onChange}: Props) => {
    const [search, setSearch] = useState("");

    const { symbols, isLoading } = useSearchSymbols(search, MarketTypes.STOCK);

    const removeEm = (s: string) => s.replace("<em>", "").replace("</em>", "");

    const CustomOption = (props: any) => {
        const { innerProps, isDisabled, label, data } = props;

        return !isDisabled ? (
            <div {...innerProps} key={label}>
                <span className="mr-1 pointer">
                    <Badge color="primary" dangerously>
                        {removeEm(data.symbol)}
                    </Badge>{" "}
                    - {removeEm(data.type)} at {removeEm(data.exchange)}
                </span>
            </div>
        ) : null;
    };

    return (
        <Select
            options={symbols}
            isLoading={isLoading}
            onChange={(s)=> onChange?.(removeEm(s?.symbol || ""))}
            onInputChange={(e) => setSearch(e)}
            getOptionLabel={(s) => removeEm(s.symbol)}
            getOptionValue={(s) => removeEm(s.symbol)}
            components={{ Option: CustomOption }}
        />
    );
};

export default TickerSearch;
