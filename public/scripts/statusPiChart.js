// The following is to create a pie chart to show the status of orders

const Order = require("./order");

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

import Order from "./order";
function drawChart() {

  // Get the orders data from the server and parse it as a JSON object
  const orders = JSON.parse(` {{ orders | tojson }} `)

  // Loop through each order in the orders array
  for (order in orders){

    // Loop through each item in the current order
    for (item in order["items"]){
      console.log("amad")
    }
  }




  var data = google.visualization.arrayToDataTable([
  ['Status', 'Status of order'],
  ['Ordered', 8],
  ['Cancelled', 2],
  ['Cooking', 4],
 
]);







  // Set the chart options, including the chart title and dimensions
  var options = {'title':'Orders', 'width':700, 'height':500};


  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}