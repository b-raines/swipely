module EmployeesHelper

  def employee_info(employee_id)
    find_tickets(employee_id)
    @average_tip = average_tip(@tickets)
    @total_sales = total_sales(@tickets)
    @average_sale = average_sale(@total_sales, @tickets)
    @tables_served = @tickets.length
    @total_time = total_time(@tickets)
    @average_time = average_time(@total_time, @tickets)
    @employee_worth = employee_worth(@tickets)
  end

  def average_tip(tickets)
    total_tips = 0
    total_payments = 0
    tickets.each do |ticket|
      total_tips += ticket.tip
      total_payments += ticket.total_payment
    end
    if total_tips == 0 || total_payments == 0
      @average_tip = 0
    else
      @average_tip = (total_tips / total_payments * 100).round(2)
    end
  end

  def total_sales(tickets)
    total_sales = 0
    tickets.each do |ticket|
      total_sales += ticket.total_payment
    end
    total_sales
  end

  def average_sale(total_sales, tickets)
    if tickets.length == 0
      average_sale = 0
    else
      average_sale = total_sales / tickets.length
    end
    average_sale
  end

  def average_time(total_time, tickets)
    if tickets.length == 0
      average_time = 0
    else
      average_time = total_time / tickets.length
      average_time = (average_time/60).round
    end
    average_time
  end

  def total_time(tickets)
    total_time = 0
    tickets.each do |ticket|
      time = ticket.ticket_close_time - ticket.ticket_open_time
      if time < 0
        close_time = ticket.ticket_close_time + 24.hours
        time = close_time - ticket.ticket_open_time
      end
      total_time += time
    end
    total_time
  end

  def employee_worth(tickets)
    if tickets.length == 0
      worth = 0
    else
      total_time = (total_time(tickets)/3600)
      total_sales = 0
      tickets.each do |ticket|
        total_sales += ticket.total_payment
      end
      worth = (total_sales/total_time).round(2)
    end
    worth.nonzero?
  end

  def find_tickets(employee_id)
    transactions = Transaction.where("description = '#{employee_id}'")
    @tickets = []
    transactions.each do |transaction|
      ticket = Ticket.find_by(ticket_id: transaction.ticket_id)
      unless ticket.nil?
        @tickets << ticket
      end
    end
  end

end
