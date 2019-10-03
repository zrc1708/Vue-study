const redis = require('redis')
const{REDIS_CONF}=require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err=>{
    console.error(err)
})

function set(key,val){
    if(typeof val === 'object'){
        val = JSON.stringify(val)    //不转换就会变成tostring
    }
    redisClient.set(key,val,redis.print)
}

function get(key){
    const promise = new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                console.error(err)
                return
            }
            console.log('val ',val)
        
            //退出
            redisClient.quit()
        })
    })
    return promise
}

module.exports={
    set,
    get
}