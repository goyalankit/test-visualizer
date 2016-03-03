(function() {
  var $table = $('#chart-example'), $chart = $('#chart-example-chart'), chart;

  // Create a button to toggle our table's visibility.
  // We could just hide it completely if we don't need it.
  $('#toggle-chart-table').click(function(e) {
    e.preventDefault();
    $table.toggle();
  });

  // Set up our Highcharts chart
  chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'chart-example-chart'
    },
    title: {
      text: "Executions over time"
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Passed/Failed'
      },
      visible: false
    },
    plotOptions: {
      column: {
        stacking: 'percent'
      },
      series: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'Passed',
      color: '#569914'
      }, {
      name: 'Failed',
      color: '#B33E3E'
      }]
  });

  // Create a function to update the chart with the current working set
  // of records from dynatable, after all operations have been run.
  function updateChart() {
    var dynatable = $table.data('dynatable'), categories = [];
    var passedValues = [], failedValues = [];
    $.each(dynatable.settings.dataset.records, function() {
      categories.push(this.date);
      passedValues.push(parseFloat(this.passed));
      failedValues.push(parseFloat(this.failed));
    });

    chart.xAxis[0].setCategories(categories);
    chart.series[0].setData(passedValues);
    chart.series[1].setData(failedValues);
  };

  // Attach dynatable to our table, hide the table,
  // and trigger our update function whenever we interact with it.
  $table
    .dynatable({
      inputs: {
        queryEvent: 'blur change keyup',
        recordCountTarget: $chart,
        paginationLinkTarget: $chart,
        searchTarget: $chart,
        perPageTarget: $chart
      },
      dataset: {
        perPageOptions: [5, 10, 20],
//        sortTypes: {
//          'date': 'number'
//        }
      }
    })
    .hide()
    .bind('dynatable:afterProcess', updateChart);

  // Run our updateChart function for the first time.
  updateChart();
})();


function goToByScroll(id){
  // Remove "link" from the ID
  id = id.replace("link", "");
  // Scroll
  $('html,body').animate({
    scrollTop: $("#"+id).offset().top},
    'slow');
}

$("#toggle-chart-button").click(function(e) {
      // Prevent a page reload when a link is pressed
    e.preventDefault(); 
      // Call the scroll function
    goToByScroll(this.id);
});
