class MyArray<T>{

    private _data:T[] = []

    constructor(){

    }

    public push(v:T):number{
        this._data.push(v)
        return this._data.length
    }
}

//对于array对象这个实例，里面的T就是string
let arr:MyArray<string> = new MyArray()
arr.push('nico')

let arr3:MyArray<number> = new MyArray()
arr3.push(1)

// let aaa:Array<number> = [1,2,'1']