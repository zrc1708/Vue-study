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
