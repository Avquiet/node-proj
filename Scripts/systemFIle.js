const fs = require('fs');
const readline = require('readline');
const ACCESS_LOG = './Files/system/access.log';

const readStream = fs.createReadStream(ACCESS_LOG, 'utf-8');
const fileLog89 = fs.createWriteStream('./Files/logs/89.123.1.41_requests.log');
const fileLog34 = fs.createWriteStream('./Files/logs/34.48.240.111_requests.log');
 
const rl = readline.createInterface({ input: readStream, terminal: true });

rl.on('line', (line) => {
    
   if (line.includes('89.123.1.41')) {
    fileLog89.write(line + '\r') 
   };

   if (line.includes('34.48.240.111')) {
    fileLog34.write(line + '\r')
   };

});