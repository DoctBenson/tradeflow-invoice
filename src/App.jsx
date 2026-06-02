import React, { useState } from 'react'
import InvoiceHeader from './components/InvoiceHeader'
import InvoiceTable from './components/InvoiceTable'
import LineItem from './components/LineItem'
import InvoiceFooter from './components/InvoiceFooter'
import html2pdf from 'html2pdf.js'
function App() {
  const [lineItems, setLineItems] = useState([
    { id: 1, description: 'Product A', qty: 2, price: 200 },
    { id: 2, description: 'Product B', qty: 1, price: 150 },
    { id: 3, description: 'Product C', qty: 4, price: 50 }
  ])

  const [editingId, setEditingId] = useState(null)
  const [businessName, setBusinessName] = useState('Your Business Name')
  
  function removeItem(id) {
  setLineItems(lineItems.filter(item => item.id !== id))
}

  function addItem() {
    const newItem = {
      id: lineItems.length + 1,
      description: 'New Product',
      qty: 1,
      price: 100
    };
    
    setLineItems([...lineItems, newItem]);
  }

function updateItem(id, field, value) {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  }

function exportPDF() {
  const element = document.getElementById('invoice-document');
  const options = { 
    margin: 10,
    filename: 'tradeflow-invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(options).from(element).save();
}

  const [status,setStatus] = useState('UNPAID')
  const [invoiceNumber, setInvoiceNumber] = useState(() => {
  const saved = localStorage.getItem('invoiceCount')
  const count = saved ? parseInt(saved) + 1 : 1
  localStorage.setItem('invoiceCount', count)
  return `INV-2026-${String(count).padStart(3, '0')}`
})

const [clientName, setClientName] = useState('Client Name')
const [date, setDate] = useState(new Date().toISOString().split('T')[0])  
const [dueDate, setDueDate] = useState('')
const [currency, setCurrency] = useState('$')
const [notes, setNotes] = useState('')
return (
  <>
    <button onClick={exportPDF} className="export-btn">
      Download PDF
    </button>

    <select
      value={currency}
      onChange={e => setCurrency(e.target.value)}
      className="currency-select"
    >
    <option value="$">USD ($)</option>
    <option value="€">EUR (€)</option>
    <option value="£">GBP (£)</option>
    <option value="₵">GHS (₵)</option>
   </select>

    <div className="status-bar">
      {['UNPAID', 'PAID', 'OVERDUE'].map(s => (
        <button
          key={s}
          onClick={() => setStatus(s)}
          className={`status-btn ${status === s ? `status-btn--${s.toLowerCase()}` : ''}`}
        >
          {s}
        </button>
      ))}

    </div>

    <div className="invoice-container" id="invoice-document">
      <InvoiceHeader
        businessName={businessName}
        onBusinessNameChange={setBusinessName}
        invoiceNumber={invoiceNumber}
        clientName={clientName}
        onClientNameChange={setClientName}
        date={date}
        onDateChange={setDate}
        dueDate={dueDate}
        onDueDateChange={setDueDate}
        status={status}
      />
      
      <InvoiceTable 
        lineItems={lineItems} 
        onAddItem={addItem}
        onRemoveItem={removeItem}
        editingId={editingId}
        setEditingId={setEditingId}
        onUpdateItem={updateItem}
        currency={currency}
      />
      
      <InvoiceFooter 
      lineItems={lineItems}
       currency={currency}
       notes={notes}
       onNotesChange={setNotes}
       
       />
      
  
    </div>
  </>
)
}

export default App