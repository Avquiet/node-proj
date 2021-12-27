require('colors');

const args = process.argv;
const colors = {
    green: 0,
    yellow: 1,
    red: 2
};

let currentColor = colors.green;
const lowerNumber = args[2];
const higherNumber = args[3];
let noPrimeNum = true;

if (isNaN(lowerNumber || higherNumber)) {
    console.log('Invalid value! Please enter a number!'.red);
    return;
}

const isPrimeNum = (num) => {
    if (num <= 1) {
        return false;
    }
    for(let i = 2; i < num; i++) 
        if (num % i === 0) {
            return false;
        }
    return true;
};

const changeColor = () => {
    currentColor++;
    if (currentColor > colors.red) {
        currentColor = colors.green;
    }
};

const colorPrint = (num) => {
    if (noPrimeNum) {
        noPrimeNum = false;
    }
    switch (currentColor) {
        case colors.red:
            console.log(`${num}`.red);
            break;
        case colors.green:
            console.log(`${num}`.green);
            break;
        case colors.yellow:
            console.log(`${num}`.yellow);
            break;    
    }
    changeColor();
};

for (let i = lowerNumber; i <= higherNumber; i++) {
    if (isPrimeNum(i)) {
        colorPrint(i);
    }
};

if (noPrimeNum) {
    console.log(`Not prime numbers:\n${lowerNumber}-${higherNumber}`.red);
}