
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Status', 'Status of order'],
  ['Ordered', 8],
  ['Cancelled', 2],
  ['Cooking', 4],
 
]);

  var options = {'title':'Orders', 'width':700, 'height':500};


  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}