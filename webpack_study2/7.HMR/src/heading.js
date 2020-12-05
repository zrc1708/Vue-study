// ./src/heading.js

export default () => {

    const element = document.createElement('h2')
  
    element.textContent = 'Hello webpack!'

    console.log('Hello webpack!');
  
    element.addEventListener('click', () => alert('Hello webpack!'))
  
    return element
  
  }
  