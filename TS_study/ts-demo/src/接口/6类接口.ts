/**
 * 类接口
 *      使用接口让某个类去符合某种契约
 * 
 * 类可以通过implements关键字去实现某个接口
 *      一个类只能有一个父类，可以implements多个接口
 */

 interface ISuper{
     fly():void
 }

 class Man{
     constructor(public name:string){

     }
 }

 class Superman extends Man implements ISuper{
     fly(){
         console.log('起飞')
     }
 }

 let nico =  new Superman('nico')

 if( typeof nico ){

 }