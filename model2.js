const mongoose = require('mongoose');


const Loan = new mongoose.Schema({
    customerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    userid:{type: String, required: true },
    item: String,
    amount: Number,
    issueDate: Date,
    dueDate: Date,
    frequency: { type: String, enum: ['bi-weekly', 'monthly'] },
    interest: Number,
    graceDays: Number,
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    balance: Number
  })
  

  module.exports = mongoose.model('Loan', Loan);