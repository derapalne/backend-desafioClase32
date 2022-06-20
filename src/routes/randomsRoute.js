import express from "express";
const { Router } = express;
const routerRandom = Router();

import { fork } from "child_process";

routerRandom.get("/", (req, res) => {
    const forked = fork("./src/utils/randomNumberGen.js");
    const cant = req.query.cant || 100000000;
    forked.send(cant);
    forked.on("message", (msg) => {
        if (msg == "listo") {
            console.log("Proceso hijo cargado");
        } else {
            res.send(msg);
        }
    });
});

export default routerRandom;
