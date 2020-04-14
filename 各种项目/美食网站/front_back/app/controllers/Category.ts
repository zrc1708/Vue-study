import {Controller, Param, Body, Get, Post, Put, Delete,Ctx} from 'routing-controllers'
import * as Koa from 'koa'

@Controller()
export class AdminCategoryController{
    @Get('/admin/category')
    public async index(@Ctx() ctx:Koa.Context){
        return ctx.body = 'nico'
    }
}