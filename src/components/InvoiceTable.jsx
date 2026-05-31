import React from 'react';

function InvoiceTable({ 
  lineItems, 
  onAddItem, 
  onRemoveItem,
  editingId,
  setEditingId,
  onUpdateItem 
}) {

  return (
    <div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th className="qty">Qty</th>
            <th className="price">Unit Price</th>
            <th className="total">Total</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map(item => {
            const rowTotal = item.qty * item.price;
            const isEditing = item.id === editingId;

            return (
              <tr key={item.id}>
                {/* Description - Editable */}
                <td className="description">
                  {isEditing ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingId(item.id)}
                      className="editable"
                    >
                      {item.description}
                    </span>
                  )}
                </td>

                {/* Quantity - Editable */}
                <td className="qty">
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => onUpdateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                      style={{ width: '60px' }}
                    />

                    



                  ) : (
                    <span 
                      onClick={() => setEditingId(item.id)}
                      className="editable"
                    >
                      {item.qty}
                    </span>
                  )}
                </td>

                {/* Price - Editable */}
                <td className="price">
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => onUpdateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingId(item.id)}
                      className="editable"
                    >
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </td>

                {/* Total */}
                <td className="total">
                  ${rowTotal.toFixed(2)}
                </td>

                {/* Delete Button */}
                <td className="action">
                  {isEditing ? (
                  <button onClick={() => setEditingId(null)} className="done-btn">
                     Done
                  </button>
                  ) : (
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={onAddItem} className="add-item-btn">
        + Add Item
      </button>
    </div>
  );
}

export default InvoiceTable;