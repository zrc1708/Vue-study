import {Controller, Param, Body, Get, Post, Put, Delete,Ctx} from 'routing-controllers'
import * as Koa from 'koa'

@Controller()
export default class MainController{

    @Get("/users")
    getAll() {
       return "This action returns all users";
    }

    @Get('/')
    public async index(@Ctx() ctx:Koa.BaseContext){
        return ctx.body = 'hello'
    }

    @Get('/user')
    public async user(@Ctx() ctx:Koa.BaseContext){
        return ctx.body = '用户中心'
    }

}