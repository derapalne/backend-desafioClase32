import autocannon from "autocannon";
import PassThrough from "stream";
import logger from "./src/utils/logger";

// Este código lo copié de las diapositivas, no está explicado qué es
const run = (url) => {
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20,
    });

    autocannon.track(inst, { outputStream });
    
    outputStream.on("data", (data) => buf.push(data));
    inst.on("done", () => {
        process.stdout.write(Buffer.concat(buf))
    });
};

logger.info("Running all benchmarks in parallel ...");
