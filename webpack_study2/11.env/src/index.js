// ./src/index.js
// import posts from './posts/posts'
// import album from './album/album'

const update = () => {
    const hash = window.location.hash || '#posts'
    const mainElement = document.querySelector('.main')

    mainElement.innerHTML = ''
    if (hash === '#posts') {
        // 魔法注释
        import(/* webpackChunkName: 'nico' */'./posts/posts').then(({ default: posts }) => {
          posts()
            // mainElement.appendChild(posts())
        })
    } else if (hash === '#album') {
        import(/* webpackChunkName: 'nico' */'./album/album').then(({ default: album }) => {
          album()
            // mainElement.appendChild(album())
        })
    }
}

window.addEventListener('hashchange', update)
update()