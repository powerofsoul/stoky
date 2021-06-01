import { useState } from "react";
import { Badge } from "tabler-react";
import AsyncSelect from "react-select/async";
import { get } from "../../Api";
import { IStock } from "../../../models/Stock";
import { debounce } from "lodash";
interface Props {
    onChange?: (symbol: string) => void;
}

const TickerSearch = ({ onChange }: Props) => {
    const CustomOption = (props: {
        innerProps: any;
        isDisabled: boolean;
        label: string;
        data: IStock;
    }) => {
        const { innerProps, isDisabled, label, data } = props;

        return !isDisabled ? (
            <div {...innerProps} key={label}>
                <span className="mr-1 pointer">
                    <Badge color="primary" dangerously>
                        {data.symbol} ({data.typeDisp})
                    </Badge>{" "}
                    - {data.longname} at {data.exchange}
                </span>
            </div>
        ) : null;
    };
    const getQuery = async (query: string) => {
        const result = await get<IStock[]>("stock/query", { query });

        return result;
    };

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={debounce((inputValue, callback) => {
                getQuery(inputValue).then((res) => callback(res));
            }, 500)}
            onChange={(s) => onChange?.(s?.symbol || "")}
            getOptionLabel={(s) => s.symbol}
            getOptionValue={(s) => s.symbol}
            components={{ Option: CustomOption }}
        />
    );
};

export default TickerSearch;
