import knex from "knex";
import logger from '../utils/logger.js';

export default class ContenedorArchivador {
    constructor(tableName, config) {
        this.tableName = tableName;
        this.knex = knex(config);
    }

    async save(data) {
        try {
            if (this.check(data)) {
                this.knex(this.tableName)
                    .insert(data)
                    .then(() => {
                        console.log("Guardado! =>", data);
                    })
                    .catch((e) => logger.error(e));
                return true;
            } else {
                return false;
            }
        } catch (e) {
            logger.error(e);
            throw new Error(e);
        }
    }
}
