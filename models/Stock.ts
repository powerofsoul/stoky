import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";

export interface IStock {
    exchange:  string;
    shortname:  string;
    quoteType:  string;
    symbol:  string;
    index:  string;
    typeDisp:  string;
    longname: string;
}

@table("stock")
export class Stock {
    @hashKey({
        type: "String",
    })
    symbol!: string;

    @attribute({
        type: "Number",
    })
    price!: number;
    
    @attribute({
        type: "Date",
        defaultProvider: () => new Date(),
    })
    updatedAt!: Date;
}
