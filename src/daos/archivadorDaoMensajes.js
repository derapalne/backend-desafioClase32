import Archivador from "../contenedor/contenedorArchivador.js";
import logger from '../utils/logger.js';

export default class ArchivadorMensajes extends Archivador {
    constructor(tableName, config) {
        super(tableName, config);
    }

    async read() {
        try {
            let mens;
            await this.knex(this.tableName)
                .select("*")
                .then((mensajes) => {
                    mens = mensajes;
                })
                .catch((e) => logger.error(e));
            return mens;
        } catch (e) {
            logger.error(e)
            throw new Error(e);
        }
    }

    async chequearTabla() {
        try {
            this.knex.schema.hasTable(this.tableName).then((exists) => {
                if (!exists) {
                    this.knex.schema
                        .createTable(this.tableName, (table) => {
                            table.increments("id");
                            table.string("texto");
                            table.string("mail");
                            table.string("timestamp");
                        })
                        .then(() => logger.info("Tabla Creada:", this.tableName))
                        .catch((e) => logger.error(e));
                    //.finally(() => this.knex.destroy());
                } else {
                    logger.info("Tabla Mensajes existente.");
                }
            });
        } catch (e) {
            logger.error(e)
            throw new Error(e);
        }
    }

    check(mensaje) {
        if (!mensaje.texto) {
            logger.error('Error en el texto del mensaje');
            return false;
        }
        if (!mensaje.mail) {
            logger.error('Error en el mail del mensaje');
            return false;
        }
        if (!mensaje.timestamp) {
            logger.error('Error en el timestamp del mensaje');
            return false;
        }
        return true;
    }
}
