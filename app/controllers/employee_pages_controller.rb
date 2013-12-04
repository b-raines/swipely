class EmployeePagesController < ApplicationController

  def home
    @transactions = Transaction.all
    @employee_ids = []
    @transactions.each do |transaction|
      if transaction.category == 'Employee'
        @employee_ids << transaction.description
      end
    end
    @employee_ids = @employee_ids.uniq
    @tickets = Ticket.all
  end

end
