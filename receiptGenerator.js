const PDFDocument = require('pdfkit');

function generateReceiptPDFStream(res, repayment) {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="receipt.pdf"');

  doc.pipe(res);

  doc.fontSize(18).text('CrediKhaata Repayment Receipt', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
  doc.text(`User Id : ${repayment.userId}`)
  doc.text(`Loan ID: ${repayment.repaymentId}`);
  doc.text(`Customer Name: ${repayment.customerName}`);
  doc.text(`Phone: ${repayment.phone}`);
  doc.text(`Amount Paid: ₹${repayment.amount}`);
  doc.text(`Status : ${repayment.status}`)
  doc.text(`Balance : ${repayment.balance}`)
  doc.moveDown();
  doc.text(`Thanks for your payment!`, { align: 'left' });

  doc.end();
}

module.exports = generateReceiptPDFStream;
