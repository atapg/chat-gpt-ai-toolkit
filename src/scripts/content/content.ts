import injectElement from './inject'

console.log('Content running')

const button = document.createElement('button')
button.textContent = 'Test Button'
button.id = 'test-button' // Unique ID for the button to avoid duplicates
button.style.position = 'fixed'
button.style.top = '20px'
button.style.right = '20px'
button.style.padding = '10px'
button.style.backgroundColor = 'blue'
button.style.color = 'white'
button.style.borderRadius = '5px'
// @ts-ignore
button.style.zIndex = 9999

button.addEventListener('click', () => {
	alert('You clicked the button!')
})

injectElement(button)
