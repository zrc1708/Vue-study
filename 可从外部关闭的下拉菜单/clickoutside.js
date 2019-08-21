Vue.directive('clickoutside',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            if(el.contains(e.target)){    //el是否包含e.target
                return false      //判断点击的区域是否是指令所在的元素内部
            }
            
            if(binding.expression){   //判断v-clickoutside有没有写表达式
                binding.value(e)       //binding.value()就是用来执行当前上下文methods中指定的函数的   
            }
           
        }
        el._vueClickOutside_=documentHandler;   //在自定义指令中，不能再用this.xxx在上下文中声明一个变量
                                                //所以用el._vueClickOutside_引用documentHandler在unbind
                                                //钩子里移除对document的click事件监听
        document.addEventListener('click',documentHandler);
    },
    unbind:function(el,binding){
        document.removeEventListener('click',el._vueClickOutside_);
        //如果不移除，当组件或元素销毁时，它仍然存在于内存中
        delete el._vueClickOutside_;
    }
})