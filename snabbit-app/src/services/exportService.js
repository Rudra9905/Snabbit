import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

class ExportService {
  // Generate invoice PDF
  static generateInvoicePDF(invoiceData) {
    try {
      const doc = new jsPDF()
    
    // Add company logo/header
    doc.setFontSize(20)
    doc.text('Snabbit Helper', 20, 20)
    doc.setFontSize(12)
    doc.text('Invoice', 20, 35)
    
    // Invoice details
    doc.setFontSize(10)
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, 50)
    doc.text(`Date: ${invoiceData.date}`, 20, 60)
    doc.text(`Due Date: ${invoiceData.dueDate}`, 20, 70)
    
    // Customer/Helper information
    doc.text('Bill To:', 20, 85)
    doc.text(invoiceData.customerName, 20, 95)
    doc.text(invoiceData.customerEmail, 20, 105)
    doc.text(invoiceData.customerPhone, 20, 115)
    doc.text(invoiceData.customerAddress, 20, 125)
    
    // Service details table
    const tableData = [
      ['Description', 'Hours', 'Rate', 'Amount'],
      [
        invoiceData.serviceName,
        invoiceData.hours,
        `$${invoiceData.rate}`,
        `$${invoiceData.amount}`
      ]
    ]
    
    autoTable(doc, {
      startY: 140,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] }
    })
    
    // Totals
    const finalY = 160 // Fixed position since we're not using doc.autoTable
    doc.text(`Subtotal: $${invoiceData.subtotal}`, 140, finalY)
    doc.text(`Tax: $${invoiceData.tax}`, 140, finalY + 10)
    doc.text(`Total: $${invoiceData.total}`, 140, finalY + 20)
    
    // Payment information
    doc.text('Payment Method:', 20, finalY + 40)
    doc.text(invoiceData.paymentMethod, 20, finalY + 50)
    doc.text('Status:', 20, finalY + 60)
    doc.text(invoiceData.status, 20, finalY + 70)
    
    // Footer
    doc.setFontSize(8)
    doc.text('Thank you for using Snabbit Helper!', 20, 280)
    
    return doc
    } catch (error) {
      console.error('Error generating invoice PDF:', error)
      throw error
    }
  }
  
  // Generate transaction report PDF
  static generateTransactionReportPDF(transactions, reportType = 'all') {
    try {
      const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text('Snabbit Helper', 20, 20)
    doc.setFontSize(16)
    doc.text('Transaction Report', 20, 35)
    doc.setFontSize(10)
    doc.text(`Report Type: ${reportType}`, 20, 45)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55)
    
    // Summary statistics
    const totalTransactions = transactions.length
    const totalAmount = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0)
    const completedTransactions = transactions.filter(t => t.status === 'completed').length
    
    doc.text(`Total Transactions: ${totalTransactions}`, 20, 70)
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 20, 80)
    doc.text(`Completed: ${completedTransactions}`, 20, 90)
    
    // Transactions table
    const tableData = transactions.map(t => [
      t.date,
      t.description,
      t.type,
      `$${t.amount}`,
      t.status,
      t.paymentMethod
    ])
    
    autoTable(doc, {
      startY: 105,
      head: [['Date', 'Description', 'Type', 'Amount', 'Status', 'Payment Method']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 }
      }
    })
    
    return doc
    } catch (error) {
      console.error('Error generating transaction report PDF:', error)
      throw error
    }
  }
  
  // Generate earnings report PDF
  static generateEarningsReportPDF(earningsData) {
    try {
      const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text('Snabbit Helper', 20, 20)
    doc.setFontSize(16)
    doc.text('Earnings Report', 20, 35)
    doc.setFontSize(10)
    doc.text(`Period: ${earningsData.period}`, 20, 45)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55)
    
    // Earnings summary
    doc.setFontSize(14)
    doc.text('Earnings Summary', 20, 70)
    doc.setFontSize(10)
    doc.text(`Total Earnings: $${earningsData.totalEarnings}`, 20, 85)
    doc.text(`Platform Fees: $${earningsData.platformFees}`, 20, 95)
    doc.text(`Net Earnings: $${earningsData.netEarnings}`, 20, 105)
    doc.text(`Jobs Completed: ${earningsData.jobsCompleted}`, 20, 115)
    doc.text(`Average per Job: $${earningsData.averagePerJob}`, 20, 125)
    
    // Service breakdown
    if (earningsData.serviceBreakdown) {
      doc.setFontSize(14)
      doc.text('Service Breakdown', 20, 145)
      
      const serviceData = earningsData.serviceBreakdown.map(service => [
        service.name,
        service.jobs,
        `$${service.earnings}`,
        `${service.percentage}%`
      ])
      
      autoTable(doc, {
        startY: 155,
        head: [['Service', 'Jobs', 'Earnings', 'Percentage']],
        body: serviceData,
        theme: 'grid',
        headStyles: { fillColor: [66, 139, 202] }
      })
    }
    
    return doc
    } catch (error) {
      console.error('Error generating earnings report PDF:', error)
      throw error
    }
  }
  
  // Generate wallet statement PDF
  static generateWalletStatementPDF(walletData) {
    try {
      const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text('Snabbit Helper', 20, 20)
    doc.setFontSize(16)
    doc.text('Wallet Statement', 20, 35)
    doc.setFontSize(10)
    doc.text(`Account: ${walletData.accountName}`, 20, 45)
    doc.text(`Period: ${walletData.period}`, 20, 55)
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 65)
    
    // Balance summary
    doc.setFontSize(14)
    doc.text('Balance Summary', 20, 80)
    doc.setFontSize(10)
    doc.text(`Opening Balance: $${walletData.openingBalance}`, 20, 95)
    doc.text(`Total Added: $${walletData.totalAdded}`, 20, 105)
    doc.text(`Total Spent: $${walletData.totalSpent}`, 20, 115)
    doc.text(`Cashback Earned: $${walletData.cashbackEarned}`, 20, 125)
    doc.text(`Closing Balance: $${walletData.closingBalance}`, 20, 135)
    
    // Transactions
    doc.setFontSize(14)
    doc.text('Transaction History', 20, 155)
    
    const transactionData = walletData.transactions.map(t => [
      t.date,
      t.description,
      t.type,
      t.amount > 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`,
      t.balance,
      t.status
    ])
    
    autoTable(doc, {
      startY: 165,
      head: [['Date', 'Description', 'Type', 'Amount', 'Balance', 'Status']],
      body: transactionData,
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 }
      }
    })
    
    return doc
    } catch (error) {
      console.error('Error generating wallet statement PDF:', error)
      throw error
    }
  }
  
  // Download PDF
  static downloadPDF(doc, filename) {
    try {
      doc.save(filename)
    } catch (error) {
      console.error('Error saving PDF:', error)
      throw error
    }
  }
  
  // Generate and download invoice
  static downloadInvoice(invoiceData) {
    try {
      const doc = this.generateInvoicePDF(invoiceData)
      const filename = `invoice-${invoiceData.invoiceNumber}-${invoiceData.date}.pdf`
      this.downloadPDF(doc, filename)
    } catch (error) {
      console.error('Error downloading invoice:', error)
      throw error
    }
  }
  
  // Generate and download transaction report
  static downloadTransactionReport(transactions, reportType = 'all') {
    try {
      const doc = this.generateTransactionReportPDF(transactions, reportType)
      const filename = `transaction-report-${reportType}-${new Date().toISOString().split('T')[0]}.pdf`
      this.downloadPDF(doc, filename)
    } catch (error) {
      console.error('Error downloading transaction report:', error)
      throw error
    }
  }
  
  // Generate and download earnings report
  static downloadEarningsReport(earningsData) {
    try {
      const doc = this.generateEarningsReportPDF(earningsData)
      const filename = `earnings-report-${earningsData.period}-${new Date().toISOString().split('T')[0]}.pdf`
      this.downloadPDF(doc, filename)
    } catch (error) {
      console.error('Error downloading earnings report:', error)
      throw error
    }
  }
  
  // Generate and download wallet statement
  static downloadWalletStatement(walletData) {
    try {
      const doc = this.generateWalletStatementPDF(walletData)
      const filename = `wallet-statement-${walletData.period}-${new Date().toISOString().split('T')[0]}.pdf`
      this.downloadPDF(doc, filename)
    } catch (error) {
      console.error('Error downloading wallet statement:', error)
      throw error
    }
  }
}

export default ExportService
