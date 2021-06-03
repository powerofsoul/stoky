import DynamoDAO from "../services/DynamoDAO";
import { Stock } from "./Stock";
import { Cache } from "./Cache";

const baseTableOptions = { writeCapacityUnits: 5, readCapacityUnits: 5 };

const tables = [Stock, Cache];

export default async function initialize() {
    // await Promise.all(tables.map((k) => DynamoDAO.deleteTable(k)));
    await Promise.all(
        tables.map((k) => DynamoDAO.ensureTableExists(k, baseTableOptions))
    );
}

(async () => {
    await initialize();
})();
