const KoaRouter = require('koa-router')

const Models  = require('../models/index')

const router  = new KoaRouter()

router.get('/',async ctx =>{

    // let data =  await Models.Users.findOne({
    //     where:{
    //         id:1
    //     },
    //     include:{
    //         model:Models.Comments
    //     }
    // })

    let data =  await Models.Contents.findAndCountAll({
            limit:2,
            offset:0,
            include:{
                model:Models.Users
            }
        })

        // console.log(data.rows)

    ctx.body = {
        code:0,
        count:data.count,
        data:data.rows.map(d=>{
            return{
                id:d.id,
                title:d.title,
                content:d.content,
                user_id:d.user_id,
                username:d.User.username,
                created_at:d.createdAt,
                like_count:d.like_count,
                comment_count:d.comment_count
            }
        })
    }
})

module.exports = router