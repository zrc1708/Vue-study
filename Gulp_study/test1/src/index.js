const headerEl =document.querySelector('header')
const scrollToTop = document.querySelector('.scrollToTop')

window.addEventListener('scroll',()=>{
    // 获取元素自身的高度
    let height = headerEl.getBoundingClientRect().height
    let glideitem = document.querySelector('.glide')
    let aboutus = document.querySelector('.about-us')
    // 顶部导航动画效果
    if(window.pageYOffset-height>800){
        if(!headerEl.classList.contains('sticky')){
            headerEl.classList.add('sticky')
            glideitem.style.top = '0'
            aboutus.style.paddingTop = "80px"
        }
    }else{
        headerEl.classList.remove('sticky')
        glideitem.style.top = '-80px'
        aboutus.style.paddingTop = "0"
    }
    // 返回顶部效果
    if(window.pageYOffset>2000){
        scrollToTop.style.display = 'block'
    }else{
        scrollToTop.style.display = 'none'
    }
})

const glide = new Glide('.glide')
const captionsEl = document.querySelectorAll('.slide__caption')

// 监听轮播图事件
glide.on(['mount.after','run.after'],()=>{
    const caption = captionsEl[glide.index]
    // anime.js第三方库
    anime({
        targets:caption.children,
        opacity:[0,1],
        duration:400,
        easing:'linear',
        delay:anime.stagger(400,{start:300}),
        translateY:[anime.stagger([40,10]),0]
    })
})
// 轮播之前将透明度设置为0，保证每次轮播都会触发动画
glide.on(['mount.before','run.before'],()=>{
    document.querySelectorAll('.slide__caption>*').forEach(el=>{
        el.style.opacity = 0
    })
})
glide.mount()

// 成功案例部分
const isotope = new Isotope(".cases",{
    // layoutMode:'fitRows',  //行模式
    itemSelector:'.case-item'
})

const filterBtns = document.querySelector('.filter-btns')

filterBtns.addEventListener('click', e =>{
    let {target} = e
    const filterOption = target.getAttribute('data-filter')
    if(filterOption){
        document.querySelectorAll('.filter-btn.active').forEach(btn=>{
            btn.classList.remove('active')
        })
        target.classList.add('active')

        isotope.arrange({filter:filterOption})
    }
})

const staggeringOption ={
    delay:300, //500毫秒出现
    distance:"50px", //有50px的移动
    duration:500,//动画执行500毫秒
    easing:'ease-in-out',
    origin:'bottom',//从下到上移动
}
// 案例，流程的出现动画效果
// 第三方库scrollreveal相关配置,interval:每一个出现后等350出现下一个
ScrollReveal().reveal('.feature',{...staggeringOption,interval:350})
ScrollReveal().reveal('.service-item',{...staggeringOption,interval:350})
// 数据的增长效果
const dataSectionEl = document.querySelector('.data-section')
ScrollReveal().reveal('.data-section',{
    beforeReveal:()=>{
        anime({
            targets:'.num',
            innerHTML:el=>{
                return[0,el.innerHTML]
            },
            duration:2000,
            round:1,//数字按1增长
            easing:'easeInExpo',
        })
        // 更新一下背景的位置
        dataSectionEl.style.backgroundPosition = 
        `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)`
    }
})

// 背景视差效果
window.addEventListener('scroll',()=>{
    const bottom = dataSectionEl.getBoundingClientRect().bottom
    const top = dataSectionEl.getBoundingClientRect().top
    // 数据框出现在可是范围内
    if(bottom>=0 && top<=window.innerHeight){
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom /5}px)`
    }
})

// 初始化滚动插件
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]',{
    header:'header',//有固定导航
    offset:80,//保持80px距离
})

// 展开导航时，选择后关闭导航
document.addEventListener('scrollStart',()=>{
    if(headerEl.classList.contains('open')){
        headerEl.classList.remove('open')
    }
})

const exploreBtnEls = document.querySelectorAll('.explors-btn')
exploreBtnEls.forEach(item=>{
    item.addEventListener('click',()=>{
        scroll.animateScroll(document.querySelector('#about-us'))
    })
})

// 折叠按钮
const burgerEl = document.querySelector('.burger')
burgerEl.addEventListener('click',()=>{
    headerEl.classList.toggle('open')
})