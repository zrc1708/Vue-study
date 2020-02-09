function http(options){

    let options = Object.assign({   //默认值处理
        method:'get',
        url:'',
        isAsync:true
    },options)

    return new Promise((resolve,reject)=>{
        let xhr = new XMLHttpRequest()
        xhr.open(options.method,options.url,options.isAsync)

        xhr.onload = function(){
            resolve(JSON.parse(xhr.responseText))
        }

        xhr.onerror = function(){
            reject({
                code:xhr.response.code,
                message:'出错了'
            })
        }

        xhr.send()
    })
}

http({
    method:'get',  //出错但是使用还是没有问题，post就会有问题
    url:'...',
    isAsync:true
}).then( data =>{

})