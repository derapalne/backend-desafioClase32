import mongoose from "mongoose";
import 'dotenv/config';
import logger from '../utils/logger.js';


export const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(process.env.MONGO_URI, advancedOptions)
    .then((db) => logger.info("MongoDB conectada 😎👍"))
    .catch((err) => logger.error(err));
