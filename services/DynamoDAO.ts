import { DataMapper } from "@aws/dynamodb-data-mapper";
const DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB({region: 'us-west-2'});
const DynamoDAO = new DataMapper({ client });

export default DynamoDAO;
