import DynamoDAO from "../services/DynamoDAO";
import { User } from "./User";

const baseTableOptions = { writeCapacityUnits: 5, readCapacityUnits: 5 };

const tables = [
    User
]

export default async function initialize() {
    await Promise.all(tables.map(k => DynamoDAO.ensureTableExists(k, baseTableOptions)));
}

(async ()=> {
    await initialize();
})();