const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const args = process.argv;  // Примеры запуска: Jan 1 2022 00:00:00, 12-12-2022
let countDownDate = new Date(args[2,3,4]).getTime()

let countDownFunction = setInterval(() => {
  eventEmitter.emit("update");

  let now = new Date().getTime()
  let distance = countDownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if(distance < 0) {
    console.log('Timer expired');
    clearInterval(countDownFunction);
    eventEmitter.emit('end');
  }
  eventEmitter.on('update', () => { 
    console.log(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ');
  });
}, 1000)