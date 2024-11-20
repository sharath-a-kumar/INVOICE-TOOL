const ExcelJS = require('exceljs');

/**
 * Generate an invoice Excel file with four sheets.
 * @param {Object} invoiceData - The invoice details.
 * @param {String} filePath - The path to save the Excel file.
 */
async function generateInvoiceExcel(invoiceData, filePath) {
    const workbook = new ExcelJS.Workbook();

    // Create 4 sheets: Original, Duplicate, Triplicate, Extra Copy
    const sheets = ['Original', 'Duplicate', 'Triplicate', 'Extra Copy'];
    sheets.forEach((sheetName) => {
        const sheet = workbook.addWorksheet(sheetName);
        createInvoiceSheet(sheet, invoiceData, sheetName);
    });

    await workbook.xlsx.writeFile(filePath);
    console.log('Excel invoice generated successfully at', filePath);
}

/**
 * Create a single invoice sheet.
 * @param {Worksheet} sheet - The Excel worksheet.
 * @param {Object} invoiceData - The invoice details.
 * @param {String} sheetLabel - The sheet label.
 */
function createInvoiceSheet(sheet, invoiceData, sheetLabel) {
    // Sheet title
    sheet.mergeCells('A1:H1');
    sheet.getCell('A1').value = `${sheetLabel} - GST Invoice`;
    sheet.getCell('A1').font = { size: 14, bold: true };
    sheet.getCell('A1').alignment = { horizontal: 'center' };

    // Header Information
    sheet.addRow(['Invoice Number', invoiceData.invoiceNumber]);
    sheet.addRow(['Invoice Date', invoiceData.invoiceDate]);
    sheet.addRow(['Due Date', invoiceData.dueDate]);

    // Customer and Company Information
    sheet.addRow(['']);
    sheet.addRow(['Customer Details', 'Company Details']);
    sheet.addRow([`Name: ${invoiceData.customerDetails.name}`, `Name: ${invoiceData.companyDetails.name}`]);
    sheet.addRow([`Address: ${invoiceData.customerDetails.address}`, `Address: ${invoiceData.companyDetails.address}`]);
    sheet.addRow([`GSTIN: ${invoiceData.customerDetails.gstin}`, `GSTIN: ${invoiceData.companyDetails.gstin}`]);

    // Item Table Headers
    sheet.addRow(['']);
    sheet.addRow(['Description', 'SAC Code', 'Quantity', 'Rate', 'Taxable Value', 'GST Rate', 'CGST', 'SGST', 'Total']);
    const headerRow = sheet.lastRow;
    headerRow.font = { bold: true };

    // Add Items
    invoiceData.items.forEach((item) => {
        sheet.addRow([
            item.description,
            item.sacCode,
            item.quantity,
            item.rate,
            item.taxableValue,
            item.gstRate + '%',
            item.cgstAmount,
            item.sgstAmount,
            item.taxableValue + item.cgstAmount + item.sgstAmount,
        ]);
    });

    // Summary
    sheet.addRow(['']);
    sheet.addRow(['Subtotal', '', '', '', '', '', '', '', invoiceData.subTotal]);
    sheet.addRow(['Total GST', '', '', '', '', '', '', '', invoiceData.totalGST]);
    sheet.addRow(['Grand Total', '', '', '', '', '', '', '', invoiceData.grandTotal]);

    // Amount in Words
    sheet.addRow(['Amount in Words', invoiceData.amountInWords]);
}

module.exports = { generateInvoiceExcel };
