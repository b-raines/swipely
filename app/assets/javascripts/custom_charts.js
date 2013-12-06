var chart; //global
var average_sales_data = [];
var total_sales_data = [];
var employee_worth_data = [];
var average_tips_data = [];
var average_time_data = [];
var tables_served_data = [];

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
            average_tips_data.push({name: key, data: [value.average_tip]});
            average_time_data.push({name: key, data: [value.average_time]});
            tables_served_data.push({name: key, data: [value.tables_served]});
        });
        buildChart(average_sales_data, 'chart-data', 'Average Sales', '$$$');
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
        series: data,
        credits: {
            enabled: false
        }
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
    $("#average-tips").click(function() {
        buildChart(average_tips_data, 'chart-data', 'Average Tips', '$$$');
    });     
    $("#average-time").click(function() {
        buildChart(average_time_data, 'chart-data', 'Average Time', 'Minutes');
    });
    $("#tables-served").click(function() {
        buildChart(tables_served_data, 'chart-data', 'Tables Served', '# of Tables');
    });
});

