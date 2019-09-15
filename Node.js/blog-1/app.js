const serverHandel = (req,res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')

    const resData = {
        name:'妮可100',
        site:'xrml',
        emv:process.env.NODE_ENV
    }

    res.end(
        JSON.stringify(resData)
    )
}

module.exports=serverHandel