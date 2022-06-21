import log4js from 'log4js';

// >>>>>Configuración del Logger

log4js.configure({
    appenders: {
        consola: { type: "console" },
        archivoWarn: { type: "file", filename: "warn.log" },
        archivoError: { type: "file", filename: "error.log" },
        loggerWarn: { type: "logLevelFilter", appender: "archivoWarn", level: "warn" },
        loggerError: { type: "logLevelFilter", appender: "archivoError", level: "error" },
    },
    categories: {
        default: { appenders: ["consola", "loggerWarn", "loggerError"], level: "all" },
    },
});
const logger = log4js.getLogger();

const logRoute = (req, res, next) => {
    logger.info(`Ruta ${req.baseUrl + req.path} - Método ${req.method}`);
    next();
};

const logUndefinedRoute = (req, res, next) => {
    logger.warn(`Ruta ${req.baseUrl + req.path} - Método ${req.method} no definido`);
    next();
};

const error = (e) => {
    logger.error('Ha ocurrido un error:', e);
}

export default {logRoute, logUndefinedRoute, error};