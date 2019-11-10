const KoaRouter = require('koa-router')

const Models  = require('../models/index')

const router  = new KoaRouter()

router.get('/',async ctx =>{

    let data =  await Models.Users.findOne({
        where:{
            id:1
        },
        include:{
            model:Models.Comments
        }
    })

    ctx.body = data
})

module.exports = router