import {
    attribute,
    hashKey,
    table
} from '@aws/dynamodb-data-mapper-annotations';

@table('user')
export class User {
    @hashKey({
        type: "String"
    })
    email!: string;
    
    @attribute({
        type: "Date",
        defaultProvider: () => new Date()
    })
    createdAt!: Date;

    @attribute({
        type: "String"
    })
    nickname!: string;

    @attribute({
        type: "String"
    })
    picture!: string;
}
