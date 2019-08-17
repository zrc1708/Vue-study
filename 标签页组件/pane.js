Vue.component('pane',{
    name:'pane',
    template:'\
        <div class="pane" v-show="show">\
            <slot></slot>\
        </div>',
     props:{
        name:{
            type:String
        },
        label:{
            type:String,
            default:''
        }
    },
    data:function(){
        return{
            show:true
        }
    },
    methods:{
        updateNav(){
            this.$parent.updateNav()
            
        }
    },
    watch:{
        label(){
            this.updateNav()
        }
    },
    mounted(){
        // pane初始化时，调用一遍tabs的updateNav方法，
        // 同时监听prop:label，在label更新时，同样调用
        this.updateNav()
        
    }
})
