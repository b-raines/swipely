var chart; //global
var average_sales_data = [];
var total_sales_data = [];
var employee_worth_data = [];

/**
 * Request data from the server, add it to the graph and set a timeout 
 * to request again
 */
function requestData() {
    $.getJSON( "api/employees", function(data) {
        $.each(data, function(key, value) {
            average_sales_data.push({name: key, data: [value.average_sale]});
            total_sales_data.push({name: key, data: [value.total_sales]});
            employee_worth_data.push({name: key, data: [value.employee_worth]});
        });
        buildChart(average_sales_data, 'chart-data', 'Average Sales', '$$$');
        // buildChart(total_sales_data, 'total_sales', 'Total Sales', '$$$');
        // buildChart(employee_worth_data, 'employee_worth', 'Employee Worth', '$ / hr')
    });
}

function buildChart(data, chart_id, chart_title, y_axis) {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: chart_id,
            defaultSeriesType: 'column'
        },
        title: {
            text: chart_title
        },
        xAxis: {
            categories: ['Employees']
        },
        yAxis: {
            title: {
                text: y_axis,
            }
        },
        series: data
    });
}

$(document).ready(function() {
    requestData();
    $("#average-sales").click(function() {
        buildChart(average_sales_data, 'chart-data', 'Average Sales', '$$$');
    });
    $("#total-sales").click(function() {
        buildChart(total_sales_data, 'chart-data', 'Total Sales', '$$$');
    });
    $("#employee-worth").click(function() {
        buildChart(employee_worth_data, 'chart-data', 'Employee Worth', '$ / hr');
    });    
});

