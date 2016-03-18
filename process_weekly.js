//module getsalesList input filepath

var fs = require('fs');

var inputSales = fs.readFileSync('./input/week1.csv', "utf8");
inputSales = inputSales.replace("Day,Date,stock item,No sold,Sales Price\n", "")

var interimArray = inputSales.split('\n');
processedArray = [];


for (i = 0; i < interimArray.length - 1; i++) {
  processedArray.push(interimArray[i].split(","));
}

var salesList = [];

processedArray.forEach(function(array) {
  salesList.push([array[2], Number(array[3])]);
})


//module getweeklySales input salesList

salesList.sort();

var weeklySales = [];

for (i = 1; i < salesList.length; i++) {

  if (i % 7 === 0) {
    var stockItem = salesList[i][0];
    var sold = 0;

    for (j = 0; j < 7; j++) {
      sold += salesList[i + j][1];
    }
    weeklySales.push({
      "stockItem": stockItem,
      "sold": sold
    });
  }
}

// module getmostpopularproduct input weekly sales

weeklySales.sort(function(a, b) {
  return b.sold - a.sold;
});

var mostPopularProduct = weeklySales[0];

console.log(mostPopularProduct);
