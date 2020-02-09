import "reflect-metadata"; 
import {createKoaServer} from "routing-controllers";
import MainController from "./controllers/MainController";

import Koa = require('koa')

// const app = new Koa()
const app = createKoaServer({
    controllers: [MainController] // we specify controllers we want to use
 });


app.listen(8888)