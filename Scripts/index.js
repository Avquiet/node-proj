const colors = require('colors')
const args = process.argv;

const lowerNumber = parseInt(args[2]);
const higherNumber = parseInt(args[3]);

if (isNaN(lowerNumber && higherNumber)) {
    console.log(colors.red('ОШИБКА!!! ВВЕДИТЕ ЧИСЛО!'))
}

for (let i = lowerNumber; i <= higherNumber; i++) {
    let flag = 0;
    
    for (let j = 2; j < i; j++) {
        if (i % j === 0) {
            flag = 1;
            console.log(colors.red('ПРОСТЫХ ЧИСЕЛ НЕ НАЙДЕНО!'))
            break;
        }
    }
    

    Array.prototype.random = function (length) {
        return this[Math.floor(Math.random() * length)];
    }

    const color = ['green', 'yellow', 'red'];
    const rColor = (color.random(color.length));

    if (i > 1 && flag === 0 ) {
        console.log(i.toString()[rColor]);
    }
}