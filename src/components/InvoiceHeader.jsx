import React from 'react';

function InvoiceHeader({ businessName, onBusinessNameChange, invoiceNumber, clientName, date, dueDate }) {
  return (
    <header className="invoice-header">
      <div className="business-info">
         <h1
          className="business-name editable"
          contentEditable
          suppressContentEditableWarning
          onFocus={e => {
          const range = document.createRange()
          range.selectNodeContents(e.target)
          const selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
        }}
          onBlur={e => onBusinessNameChange(e.target.innerText)}
        >
          {businessName}
        </h1>
        <p className="tagline">Professional Services • Accra, Ghana</p>
      </div>

      <div className="invoice-details">
        <h2>Invoice #{invoiceNumber}</h2>
        
        <div className="client-info">
          <p><strong>Client:</strong> {clientName}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
      </div>
    </header>
  );
}

export default InvoiceHeader;