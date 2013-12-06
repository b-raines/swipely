class Api::EmployeesController < ApplicationController

  include EmployeesHelper

  def index
    find_employees
    render json: store_employee_info(@employee_ids)
  end

  def store_employee_info(employee_ids)
    employee_ids.each_with_object(Hash.new(0)) do |employee_id, obj|
      employee_info(employee_id)
      obj[employee_id] = Hash.new(0)
      obj[employee_id][:average_tip] = @average_tip
      obj[employee_id][:total_sales] = @total_sales.round(2)
      obj[employee_id][:average_sale] = @average_sale.round(2)
      obj[employee_id][:tables_served] = @tables_served
      obj[employee_id][:total_time] = @total_time
      obj[employee_id][:average_time] = @average_time
      obj[employee_id][:employee_worth] = @employee_worth
    end
  end

  def find_employees
    @transactions = Transaction.all
    @employee_ids = []
    @transactions.each do |transaction|
      if transaction.category == 'Employee'
        @employee_ids << transaction.description
      end
    end
    @employee_ids = @employee_ids.uniq
  end

end
