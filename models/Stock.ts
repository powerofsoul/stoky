import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";

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
