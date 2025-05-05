
const mongoose = require('mongoose');

const Repayment = new mongoose.Schema({
    loanid: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    amount: Number,
    date: Date
  })

module.exports = mongoose.model('Repayment', Repayment);