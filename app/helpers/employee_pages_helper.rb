module EmployeePagesHelper

  def average_tip(employee_id)
    find_tickets(employee_id)
    total_tips = 0
    total_payments = 0
    @tickets.each do |ticket_id|
      ticket = Ticket.find_by(ticket_id: ticket_id)
      unless ticket.nil?
        total_tips += ticket.tip
        total_payments += ticket.total_payment 
      end
    end
    if total_tips == 0 || total_payments == 0
      @average_tip = 0
    else
      @average_tip = (total_tips / total_payments * 100).round(2).to_s + "%"
    end
  end

  def total_sales(employee_id)
    find_tickets(employee_id)
    @total_sales = 0
    @tickets.each do |ticket_id|
      ticket = Ticket.find_by(ticket_id: ticket_id)
      @total_sales += ticket.total_payment unless ticket.nil?
    end
    number_to_currency(@total_sales, precision: 2)
  end

  def average_sale(employee_id)
    total_sales(employee_id)
    @average_sale = @total_sales / @tickets.length
    number_to_currency(@average_sale, precision: 2)
  end

  def tables_served(employee_id)
    find_tickets(employee_id)
    @tickets.length
  end

  def average_time(employee_id)
    find_tickets(employee_id)
    total_time = 0
    @tickets.each do |ticket_id|
      ticket = Ticket.find_by(ticket_id: ticket_id)
      unless ticket.nil?
        time = ticket.ticket_close_time - ticket.ticket_open_time
        if time < 0
          close_time = ticket.ticket_close_time + 24.hours
          time = close_time - ticket.ticket_open_time
        end
        total_time += time
      end
    end
    @average_time = total_time / @tickets.length
    @average_time = (@average_time/60).round
  end

  def find_tickets(employee_id)
    transactions = Transaction.where("description = '#{employee_id}'")
    @tickets = []
    transactions.each do |transaction|
      @tickets << transaction.ticket_id
    end
    @tickets
  end

end
