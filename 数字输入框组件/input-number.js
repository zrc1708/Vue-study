function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'')
}

Vue.component('input-number',{
    template:'\
    <div class="input-number">\
        <input type="text" :value="currentValue" @change="handleChange">\
        <button @click="handleDown" :disabled="currentValue<=min">-</button>\
        <button @click="handleUp" :disabled="currentValue>=max">+</button>\
    </div>',
    props:{
        max:{
            type:Number,
            default:Infinity
        },
        min:{
            type:Number,
            default:-Infinity
        },
        value:{
            type:Number,
            default:0
        }
    },
    data:function(){
        return{
            currentValue:this.value
        }
    },
    //监听两个变量：value和currentvlaue,监听value是要知晓从父组件修改了value，监听currentvalue是为了当其改变时，更新value
    //监听currentvalue的回调里，this.$emit('input',val)是在使用v-model时改变value的；
    //this.$emit('on-change',val)是触发自定义事件on-change用于告知父组件输入框的值有改变
    watch:{       
        currentValue:function(val){
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
        value:function(val){
            this.updateValue(val);
        }
    },
    methods:{       
        handleDown:function(){
            if(this.currentValue<=this.min) return;
            this.currentValue-=1;
        },
        handleUp:function(){
            if(this.currentValue>=this.max) return;
            this.currentValue+=1;
        },
        updateValue:function(val){  //用来过滤出正确的currentvalue
            if(val>this.max) val=this.max;
            if(val<this.min) val=this.min;
            this.currentValue=val;
        },
        handleChange:function(event){
            var val = event.target.value.trim();

            var max =this.max;
            var min = this.min;

            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val;

                if(val>max){
                    this.currentValue=max;
                }else if(val<min){
                    this.currentValue = min;
                }
            }else{
                event.target.value = this.currentValue;
            }
        }
    },
    mounted:function(){
        this.updateValue(this.value);
    }

})