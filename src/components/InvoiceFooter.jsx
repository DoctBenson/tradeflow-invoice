import React from 'react';
function InvoiceFooter({ lineItems, currency, notes, onNotesChange  }) {
  const subtotal = lineItems.reduce((sum, item) => {
    return sum + (item.qty * item.price);
  }, 0);

  const taxRate = 0.10;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="invoice-footer">
      <table className="totals-table">
        <tbody>
          <tr>
            <td className="label">Subtotal</td>
            <td className="amount">{currency}{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="label">Tax (10%)</td>
            <td className="amount"> {currency} {taxAmount.toFixed(2)}</td>
          </tr>
          <tr className="grand-total-row">
            <td className="label"><strong>Grand Total</strong></td>
            <td className="amount"><strong>{currency} {grandTotal.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>

      <button 
         className="pay-btn"
         onClick={() => alert(`Processing payment of ${currency}${grandTotal.toFixed(2)}…`)}
        >
         Pay Now
      </button>

        <div className="notes-section">
      <h4>Notes / Payment Terms</h4>
       <textarea
       className="notes-input"
       placeholder="e.g. Payment due within 14 days. Bank transfer to Acct #1234..."
       value={notes}
       onChange={e => onNotesChange(e.target.value)}
     />
    </div>
       
    </div>
  );
}

export default InvoiceFooter;