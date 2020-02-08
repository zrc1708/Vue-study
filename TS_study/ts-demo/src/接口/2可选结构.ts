/**
 * 如果规则中有些是可选的，name通过？标识
 */
interface Options{
    width:number
    height:number
    color?:string
}

function fn3(opts:Options){}

fn3({
    width:100,
    height:200
})