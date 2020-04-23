(async function () {
    const mysql = require('mysql2/promise')

    const connection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'password',
        port:'3306',
        database:'myblog'
    })
/**
 * arr返回一个数组，第一个数组是记录的值，第二个数组是记录中的包含的字段的信息
 */
    // let arr = await connection.query("select * from users")
    // console.log(arr)

    /**
     * 解构赋值
     */
    let [users] = await connection.query("select * from users")
    console.log(users)
})()
