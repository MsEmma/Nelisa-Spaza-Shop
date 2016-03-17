var fs = require('fs');

var inputSales = fs.readFileSync('./input/week1.csv', "utf8");
var interimArray = inputSales.split('\n');
processedArray = [];

for (i = 1; i < interimArray.length - 1; i++) {
  processedArray.push(interimArray[i].split(","));
}

var salesList = [];

processedArray.forEach(function(array) {
  salesList.push([array[2], Number(array[3])]);
})

console.log(salesList);
