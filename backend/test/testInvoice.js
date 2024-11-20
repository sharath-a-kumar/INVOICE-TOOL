// Import utilities
const { calculateTaxes } = require('../utils/taxCalculator');
const { generateInvoiceExcel } = require('../utils/excelGenerator');
const { numberToWords } = require('../utils/numberToWords');

// Test Tax Calculator
const taxDetails = calculateTaxes(500, 2, 18, 'CGST+SGST');
console.log('Tax Details:', taxDetails);

// Test Number to Words
const words = numberToWords(1180);
console.log('Amount in Words:', words);

// Test Excel Generation
const invoiceData = {
    invoiceNumber: 'INV-2024-001',
    invoiceDate: '2024-11-20',
    dueDate: '2024-12-01',
    companyDetails: {
        name: 'Company Ltd.',
        address: '123 St',
        gstin: 'GSTIN12345',
    },
    customerDetails: {
        name: 'Customer ABC',
        address: '456 Rd',
        gstin: 'GSTIN67890',
    },
    items: [
        {
            description: 'Product A',
            sacCode: '1234',
            quantity: 2,
            rate: 500,
            taxableValue: 1000,
            gstRate: 18,
            cgstAmount: 90,
            sgstAmount: 90,
        },
    ],
    subTotal: 1000,
    totalGST: 180,
    grandTotal: 1180,
    amountInWords: 'One Thousand One Hundred Eighty Rupees Only',
};

generateInvoiceExcel(invoiceData, './invoice.xlsx');
console.log('Invoice Excel generated: ./invoice.xlsx');
