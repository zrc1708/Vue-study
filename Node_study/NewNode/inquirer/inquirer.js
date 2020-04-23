const inquirer = require('inquirer')

//提问用户，与用户进行交互
//promit数组中放指定格式的对象
inquirer.prompt([
    {
        type:'input',
        name:'username',
        message:'请输入你的应用名称',
        default:'zMouse',   //默认值
        //对用户输入的数据或选择的数据进行验证
        validate(val){     //用户输入值
            if(val.trim()===''){    //去除两端多余的空格后为空
                return '应用名称不能为空'
            }
            return true
        },
        //对用户输入的数据或选择的数据进行过滤
        filter(val){
            return val.toLowerCase()   //变小写
        }
    },
    {
        type:'confirm',
        name:'useES6',
        message:'是否启用ES6支持',
        default:true
    },
    {
        type:'list',
        name:'framework',
        message:'请选择框架',
        choices:['Vue','React','Angular'],
        default:0
    },
    {
        type:'rawlist',
        name:'framework2',
        message:'请选择框架',
        choices:['Vue','React','Angular'],
        default:0
    },
    {
        type:'checkbox',
        name:'tools',
        message:'开发工具',
        choices:[
            {
                name:'使用ESLint',
                value:'eslint',
                checked:true    //默认选中
            },
            {
                name:'使用mocha单元测试',
                value:'mocha'
            }
        ],
        default:0
    }
]).then(answers=>{
    console.log(answers)
})