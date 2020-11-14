console.log('Client side java script is loaded!')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent ='abcd'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    messageOne.textContent = 'loading...';
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error);
            } else {

                console.log(data.location);
                messageOne.textContent = data.location;
                console.log(data.forcast);
                messageTwo.textContent = data.forcast;
            }

        })
    });
});