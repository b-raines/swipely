var chart; //global
var employees_data;
var average_sales_data = [];
var total_sales_data = [];
var employee_worth_data = [];
var average_tips_data = [];
var average_time_data = [];
var tables_served_data = [];

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

/**
 * Request data from the server, add it to the graph and set a timeout 
 * to request again
 */
function requestData() {
    $.getJSON( "api/employees", function(data) {
        employees_data = data
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
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            employee = employees_data[this.series.name];
                            $('#employee-tables').append('<div class="employee-info"><table><tr><th>Employee</th><td>'+this.series.name+'<a href="" class="close">x</a></td></tr><tr><th>Average Sale</th><td>$'+employee.average_sale+'</td></tr><tr><th>Total Sales</th><td>$'+commaSeparateNumber(employee.total_sales)+'</td></tr><tr><th>Employee Worth</th><td>$'+employee.employee_worth+'/hr</td></tr><tr><th>Average Tip</th><td>$'+employee.average_tip+'</td></tr><tr><th>Average Time</th><td>'+employee.average_time+' minutes</td></tr><tr><th>Tables Served</th><td>'+employee.tables_served+'</td></tr></table></div>');
                        }
                    }
                }
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
    $(document.body).on('click', '.close', function() {
        event.preventDefault();
        $(this).closest('.employee-info').remove();
    });
});

