/**
 * Calculate the taxable value, GST amounts, and totals.
 * @param {Number} rate - Price per unit.
 * @param {Number} quantity - Number of units.
 * @param {Number} gstRate - GST percentage.
 * @param {String} gstType - Type of GST: "CGST+SGST" or "IGST".
 * @returns {Object} - Taxable value, CGST, SGST, IGST, and total amount.
 */
function calculateTaxes(rate, quantity, gstRate, gstType) {
    const taxableValue = rate * quantity;
    const gstAmount = (taxableValue * gstRate) / 100;

    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;

    if (gstType === 'CGST+SGST') {
        cgstAmount = gstAmount / 2;
        sgstAmount = gstAmount / 2;
    } else if (gstType === 'IGST') {
        igstAmount = gstAmount;
    }

    return {
        taxableValue,
        cgstAmount,
        sgstAmount,
        igstAmount,
        totalAmount: taxableValue + gstAmount,
    };
}

module.exports = { calculateTaxes };
