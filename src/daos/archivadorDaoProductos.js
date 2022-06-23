import Archivador from "../contenedor/contenedorArchivador.js";
import logger from '../utils/logger.js';

export default class ArchivadorProductos extends Archivador {
    constructor(tableName, config) {
        super(tableName, config);
    }

    async getAll() {
        try {
            let prods;
            await this.knex(this.tableName)
                .select("*")
                .then((productos) => {
                    // Si trato de retornar los datos desde acá, no llegan al servidor;
                    prods = productos;
                })
                .catch((e) => logger.error(e))
                .finally(() => this.knex.destroy);
            return prods;
        } catch (e) {
            logger.error(e)
            throw new Error(e);
        }
    }

    async getById(id) {
        try {
            await this.knex(this.tableName)
                .where({ id: id })
                .select("*")
                .then((producto) => {
                    return producto;
                })
                .catch((e) => logger.error(e))
                .finally(() => this.knex.destroy);
        } catch (e) {
            logger.error(e)
            throw new Error(e);
        }
    }

    async setById(id, producto) {
        try {
            if (this.check(producto)) {
                await this.knex(this.tableName)
                    .where({ id: id })
                    .update({
                        title: producto.title,
                        price: producto.price,
                        thumbnail: producto.thumbnail,
                    })
                    .then(() => console.log("Producto modificado"))
                    .catch((e) => logger.error(e))
                    .finally(() => this.knex.destroy);
            } else {
                logger.error('Producto inválido')
                throw new Error("Producto inválido.");
            }
        } catch (e) {
            logger.error(e)
            throw new Error(e);
        }
    }

    async deleteById(id) {
        try {
            await this.knex(this.tableName)
                .where({ id: id })
                .del()
                .then(() => console.log("Producto borrado"))
                .catch((e) => logger.error(e))
                .finally(() => this.knex.destroy());
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
                            table.string("title");
                            table.float("price");
                            table.string("thumbnail");
                        })
                        .then(() => console.log("Tabla Creada:", this.tableName))
                        .catch((e) => logger.error(e));
                } else {
                    logger.info("Tabla Productos existente.");
                }
            });
        } catch (e) {
            logger.error(e)
            throw new Error(e);
        }
    }

    check(producto) {
        if (!producto.title) {
            logger.error("Error en el título del producto");
            return false;
        }
        if (!producto.price) {
            logger.error("Error en el precio del producto");
            return false;
        } else {
            const price = Number(producto.price);
            if (isNaN(price)) {
                logger.error("Error en el precio del producto");
                return false;
            }
        }
        if (!producto.thumbnail) {
            logger.error("Error en el thumbnail del producto");
            return false;
        }
        return true;
    }
}
