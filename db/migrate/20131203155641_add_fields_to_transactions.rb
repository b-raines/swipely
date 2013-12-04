class AddFieldsToTransactions < ActiveRecord::Migration
  def change
    add_column :transactions, :ticket_id, :integer
    add_column :transactions, :item_id, :integer
    add_column :transactions, :description, :string
    add_column :transactions, :type, :string
    add_column :transactions, :quantity, :integer
    add_column :transactions, :unit_price, :float
  end
end
