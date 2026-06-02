import React from 'react';

function InvoiceHeader({ businessName, onBusinessNameChange, invoiceNumber, clientName, onClientNameChange, date, onDateChange, dueDate, onDueDateChange, status }) {
  return (
    <header className="invoice-header">

      <div className={`invoice-stamp stamp--${status.toLowerCase()}`}>
        {status}

      </div>

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
          onBlur={e => {
            const text = e.target.innerText.trim()
            if (text) onBusinessNameChange(text)
            else e.target.innerText = ''
          }}
        >
          {businessName}
        </h1>
        <p className="tagline">Professional Services • Accra, Ghana</p>
      </div>

      <div className="invoice-details">
        <h2>Invoice #{invoiceNumber}</h2>
        <div className="client-info">
          <p><strong>Client:</strong>
            <span
              contentEditable
              suppressContentEditableWarning
              onFocus={e => {
                const range = document.createRange()
                range.selectNodeContents(e.target)
                const selection = window.getSelection()
                selection.removeAllRanges()
                selection.addRange(range)
              }}
              onBlur={e => onClientNameChange(e.target.innerText)}
            >
              {clientName}
            </span>
          </p>
          <p><strong>Date:</strong> <input type="date" value={date} onChange={e => onDateChange(e.target.value)} /></p>
          <p><strong>Due Date:</strong> <input type="date" value={dueDate} onChange={e => onDueDateChange(e.target.value)} /></p>
        </div>
      </div>
    </header>
  )
}

export default InvoiceHeader