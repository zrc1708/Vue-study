import "reflect-metadata"; 
import {createKoaServer} from "routing-controllers";
import MainController from "./controllers/MainController";
import {AdminCategoryController} from "./controllers/Category"


// import {koa} from "koa"
import Koa = require('koa')

// let app = new Koa()
const app = createKoaServer({
    controllers: [MainController,AdminCategoryController] // we specify controllers we want to use
 });

app.use(async (ctx:Koa.Context,next:any) =>{

    await next()
})


app.listen(8888)