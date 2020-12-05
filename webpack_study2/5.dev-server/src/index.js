// ./src/index.js
import axios from 'axios'
import createHeading from './heading.js'

const heading = createHeading()

document.body.append(heading)

axios.get('http://127.0.0.1:9000/api/users/zrc1708').then(data =>{
    console.log(data);
})