// function fn13<T extends HTMLElement>(a:T){
//     a.querySelector('div')
// }

interface Len{
    length:number
}

function fn13<T extends Len>(a:T){
    //不是所有类型都有length属性
    a.length
}

fn13('1')