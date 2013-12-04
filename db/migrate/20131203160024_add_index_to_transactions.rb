class AddIndexToTransactions < ActiveRecord::Migration
  def change
    add_index :transactions, :ticket_id
  end
end
