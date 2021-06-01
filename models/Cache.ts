import {
    attribute,
    hashKey,
    table,
} from "@aws/dynamodb-data-mapper-annotations";

@table("cache")
export class Cache {
    @hashKey({
        type: "String",
    })
    key!: string;

    @attribute({
        type: "Number",
    })
    status!: number;

    @attribute({
        type: "String",
    })
    data!: any;

    @attribute({
        type: "Date"
    })
    addedOn!: Date;
}
