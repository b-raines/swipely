var chart; //global
var employees_data;
var num_employees = 0;
var average_sales_data = [];
var total_sales_data = [];
var employee_worth_data = [];
var average_tips_data = [];
var average_time_data = [];
var tables_served_data = [];

var avg_sale_sum = 0;
var total_sales_sum = 0;
var employee_worth_sum = 0;
var avg_tip_sum = 0;
var avg_time_sum = 0;
var tables_served_sum = 0;

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

/**
 * Request data from the server and build initial chart.
 */
function requestData() {
    $.getJSON( "api/employees", function(data) {
        employees_data = data;
        num_employees = Object.keys(employees_data).length;
        $.each(data, function(key, value) {
            avg_sale_sum += value.average_sale/num_employees;
            total_sales_sum += value.total_sales/num_employees;
            employee_worth_sum += value.employee_worth/num_employees;
            avg_tip_sum += value.average_tip/num_employees;
            avg_time_sum += value.average_time/num_employees;
            tables_served_sum += value.tables_served/num_employees;
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

/** Find difference between average and employee value. **/
function plusMinus(employee, average) {
    diff = employee - average;
    diff = Math.round(diff * 100)/100;
    if(diff > 0) {
        diff = '+' + diff;
    }
    return diff;
}

/** Dynamic class for green or red font based on employee deltas **/
function greenRed(employee, average) {
    if(employee > average) {
        return 'green';
    } else if(employee < average) {
        return 'red';
    }
}
/**
'<span class="'+greenRed()+'"> ('+
')</span>'+
**/

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
                            $('#employee-tables').append('<div class="employee-info"><table><tr><th>Employee</th><td>'+this.series.name+'<a href="" class="close">x</a></td></tr><tr><th>Average Sale</th><td>$'+employee.average_sale+'<span class="'+greenRed(employee.average_sale, avg_sale_sum)+'"> ('+plusMinus(employee.average_sale, avg_sale_sum)+')</span>'+'</td></tr><tr><th>Total Sales</th><td>$'+commaSeparateNumber(employee.total_sales)+'<span class="'+greenRed(employee.total_sales, total_sales_sum)+'"> ('+commaSeparateNumber(plusMinus(employee.total_sales, total_sales_sum))+')</span>'+'</td></tr><tr><th>Employee Worth</th><td>$'+employee.employee_worth+'/hr<span class="'+greenRed(employee.employee_worth, employee_worth_sum)+'"> ('+plusMinus(employee.employee_worth, employee_worth_sum)+')</span>'+'</td></tr><tr><th>Average Tip</th><td>'+employee.average_tip+'%<span class="'+greenRed(employee.average_tip, avg_tip_sum)+'"> ('+plusMinus(employee.average_tip, avg_tip_sum)+')</span>'+'</td></tr><tr><th>Average Time</th><td>'+employee.average_time+' minutes<span class="'+greenRed(employee.average_time, avg_time_sum)+'"> ('+plusMinus(employee.average_time, avg_time_sum)+')</span>'+'</td></tr><tr><th>Tables Served</th><td>'+employee.tables_served+'<span class="'+greenRed(employee.tables_served, tables_served_sum)+'"> ('+plusMinus(employee.tables_served, tables_served_sum)+')</span>'+'</td></tr></table></div>');
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

