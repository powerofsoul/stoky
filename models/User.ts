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
    id!: string;
    
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

export const auth0UserToUser = (auth0User: any) => {
    const user = new User();
    user.createdAt = new Date();
    user.id = auth0User.sub;
    user.nickname = auth0User.nickname;
    user.picture = auth0User.picture;

    return user;
}