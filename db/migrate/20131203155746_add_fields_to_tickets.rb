class AddFieldsToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :ticket_id, :integer
    add_column :tickets, :date, :date
    add_column :tickets, :ticket_open_time, :datetime
    add_column :tickets, :ticket_close_time, :datetime
    add_column :tickets, :total_payment, :float
    add_column :tickets, :tip, :float
    add_column :tickets, :covers, :integer
  end
end
