
// console.log('Client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     }) 
// })

// my try below

// const data = 'response.body.current'
// fetch('http://api.weatherstack.com/current?access_key=68bf45dbbafd6553f0e77f693e5295f0&query=-6.827329,39.315613&units=m').then((response) => {
//     response.json().then( (data) => {
//         console.log(data);
//     }) 
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() ; //this prevents the usual refreshing of the page

    
    messageOne.textContent = 'Loading...!'
    messageTwo.textContent = ''

    const location = search.value

    const anuani = 'http://localhost:3000/weather?address=' +location
 
    // console.log(location);

    fetch(anuani).then((response) => {
        response.json().then((data) => {
            if (data.error){
                // console.log(data.error)

                messageOne.textContent = 'Ooops! Something is wrong'
                messageTwo.textContent = data.error

            } else {
                // console.log(data.location)
                // console.log(data.forecast)

                let focast = JSON.stringify(data.forecast)
                focast2 = focast.replace(/[{}]/g, '')
                focast3 = focast2.replace(/[,]/g, ',  ')
                messageOne.textContent = data.location
                messageTwo.textContent = focast3
            }
        })
    })


})