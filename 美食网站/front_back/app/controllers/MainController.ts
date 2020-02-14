/**
 * 控制器是通过class来实现的
 * 并不是随便什么class他就能成为控制器
 * 类似继承的概念，routing-controllers为我们提供了一个装饰器：controller
 * 通过这个装饰器就可以吧一个普通的类变成具有控制器特诊的控制器类
 */

import {Controller, Param, Body, Get, Post, Put, Delete,Ctx} from 'routing-controllers'
import * as Koa from 'koa'

@Controller()
export default class MainController{

    @Get('/')
    public async index(@Ctx() ctx:Koa.Context){
        return ctx.body = 'hello'
    }

    @Get('/user')
    public async user(@Ctx() ctx:Koa.Context){
        return ctx.body = '用户中心'
    }

    @Post('/select')
    public async select(@Ctx() ctx:Koa.Context){
        return ctx.body='Hello post'
    }
}