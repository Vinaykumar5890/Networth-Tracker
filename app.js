const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt  = require('bcrypt')
const { isBefore } = require('date-fns');
const bodyParser = require('body-parser');
const Registeruser = require('./model')
const Customer = require('./model1')
const Loan = require('./model2')
const Repayment = require('./model3')
const generateReceiptPDFStream = require('./receiptGenerator');
const app = express()

require('dotenv').config();

app.use(express.json())
app.use(bodyParser.json());
app.use(cors({origin: '*'}))

  mongoose.connect("mongodb+srv://manga:2dMadeEvCpjx4JwH@cluster0.fv2hjsb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err))


function authenticateToken(request, response, next) {
  let jwtToken
  const authHeader = request.headers['authorization']
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]
  }
  if (jwtToken === undefined) {
    response.status(401)
    response.send('Your Not Authorized User')
  } else {
    jwt.verify(jwtToken, 'jwt', async (error, payload) => {
      if (error) {
        response.status(401)
        response.send(
          'Your Not Authorized User',
        )
      } else {
        next()
      }
    })
  }
}


//User Register Using Post Method : /register

app.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body
    let exits = await Registeruser.findOne({email})
    if (exits) {
      return res.status(400).send('User Already Exist')
    } else if (!email || !username || !password) {
      return res.status(400).send('All fields are required')
    }
    if (password.length > 6) {
      const hashedPassword = await bcrypt.hash(password, 10)

      let newUser = new Registeruser({
        username,
        email,
        password: hashedPassword,
      })
      await newUser.save()
      res.status(200).send('Register Succesfully')
    } else {
      res.status(400).send('Password Too Short')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

//User Login Using Post Method : /Login

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    let exits = await Registeruser.findOne({email})
    if (!exits) {
      return res.status(400).send("User Doesn't Exits")
    } else if (!email || !password) {
      return res.status(400).send('All fields are required')
    } else {
      const isPasswordMatched = await bcrypt.compare(password, exits.password)
      if (isPasswordMatched === true) {
        let payload = {
          user: {
            id: exits.id,
          },
        }
        jwt.sign(payload, 'jwt', (err, jwtToken) => {
          if (err) throw err
          return res.json({jwtToken})
        })
      } else {
        return res.status(400).send('Invalid Password')
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error')
  }
})

//Get All User Using Get Method :/users

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await Registeruser.find()
    res.status(200).json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

//Customer Register Using Post Method : /customer

app.post('/customer', authenticateToken, async (req, res) => {
  try {
    const {userid, name, phone,trustScore} = req.body
    let exits = await Customer .findOne({ phone })
    if (exits) {
      return res.status(400).send('Customer Already Exist')
    } else if (!userid || !name || !phone || !trustScore) {
      return res.status(400).send('All fields are required')
    } else {
      let newCustomer = new Customer({
        userid,
        name,
        phone,
        trustScore
      })
      await newCustomer.save()
      res.status(200).send('Customer Register Succesfully')
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
)

//Customer Get Using Get Method : /customer

app.get('/customer', authenticateToken, async (req, res) => {
  try {
    const customer = await Customer.find()
    res.status(200).json(customer)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

//Customer Update Using Get Method : /customer/:UserId

app.get('/customer/:userid', authenticateToken, async (req, res) => {

    const { userid} = req.params;
  try {
    const customers = await Customer.find({ userid: userid });
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customer found for this user." });
    }
    res.status(200).json(customers);
    
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
)

// Customer Update Using Get Method using id : /customer/:userid/:id

app.get('/customer/:userid/:id', authenticateToken, async (req, res) => {

  const { userid,id} = req.params;
try {
  const customers = await Customer.find({ userid: userid });
  if (!customers || customers.length === 0) {
    return res.status(404).json({ message: "No customer found for this user." });
  }else if (!id) {
    return res.status(400).send('All fields are required')
  }else{
  const customer = await Customer.findById (id);
  res.status(200).json(customer);
  }
  
} catch (err) {
  console.log(err)
  return res.status(500).send('Internal Server Error')
}
}
)
 
//Customer Delete Using Delete Method : /customer/:UserId/:id

app.delete('/customer/:userid/:id', authenticateToken, async (req, res) => {
  const { userid,id} = req.params;
  try {
    const customers = await Customer.find({ userid: userid });
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customer found for this user." });
    }else if (!id) {
      return res.status(400).send('All fields are required')
    }else{
    const customer = await Customer.findByIdAndDelete (id);
    res.status(200).json("Customer Deleted Succesfully");
    }
    
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }

}
)

//Customer Update using Put Method : /customer/:userid/:id

app.put('/customer/:userid/:id', authenticateToken, async (req, res) => {

  const { userid,id} = req.params;
try {
  const customers = await Customer.find({ userid: userid });
  if (!customers || customers.length === 0) {
    return res.status(404).json({ message: "No customer found for this user." });
  }else if (!id) {
    return res.status(400).send('All fields are required')
  }else{
  const customer = await Customer.findByIdAndUpdate (id, req.body, { new: true });
  res.status(200).json(customer);
  }  
}
catch (err) {
  console.log(err)
  return res.status(500).send('Internal Server Error')
}

})


// Create Loan
app.post('/loan', authenticateToken, async (req, res) => {
  const { customerid, userid,item, amount, issueDate, dueDate, frequency, interest, graceDays } = req.body
  try {
    const loan = new Loan({
      customerid,
      userid,
      item,
      amount,
      issueDate,
      dueDate,
      frequency,
      interest,
      graceDays,
      balance: amount
    })
    await loan.save()
    res.status(201).send('Loan Created Successfully')
  } catch (err) {
    res.status(500).send('Error creating loan')
  }
})

//  Get All Active Loans
app.get('/loan', authenticateToken, async (req, res) => {
  try {
    const loans = await Loan.find()
    res.status(200).json(loans)
    } catch (err) {
    res.status(500).send('Error fetching loans')
  }
})

// Get All Loans for a User

app.get('/loan/:userid/', authenticateToken, async (req, res) => {

  const { userid} = req.params;
try {
  const customers = await Loan.find({ userid: userid });
  if (!customers || customers.length === 0) {
    return res.status(404).json({ message: "No customer found for this user." });
  }else if (!userid) {
    return res.status(400).send('All fields are required')
  }else{
  res.status(200).json(customers);
  }

} catch (err) {
  console.log(err)
  return res.status(500).send('Internal Server Error')
}
}
)

// Get Loan by ID for a User

app.get('/loan/:userid/:id', authenticateToken, async (req, res) => {

  const { userid,id} = req.params;
try {
  const customers = await Loan.find({ userid: userid });
  if (!customers || customers.length === 0) {
    return res.status(404).json({ message: "No Loans found for this user." });
  }else if (!id) {
    return res.status(400).send('All fields are required')
  }else{
  const customer = await Loan.findById (id);
  res.status(200).json(customer);
  }
  
} catch (err) {
  console.log(err)
  return res.status(500).send('Internal Server Error')
}
}
)

// Post Loan Repayment

app.post('/repayment', authenticateToken, async (req, res) => {
  const { loanid, amount, date } = req.body
  try {
    const loan = await Loan.findById(loanid)
    if (!loan) return res.status(404).send('Loan not found')

    const repayment = new Repayment({ loanid, amount, date })
    await repayment.save()

    loan.balance -= amount
    loan.status = loan.balance <= 0 ? 'paid' : loan.status
    await loan.save()

    res.status(201).send('Repayment Recorded')
  } catch (err) {
    res.status(500).send('Error recording repayment')
  }
})

// GET Repayment History for a Loan totalLoans, totalAmount, totalRepayments

app.get("/summary", authenticateToken, async (req, res) => {
  try {
    const loans = await Loan.find()
    const totalLoans = loans.length
    const totalAmount = loans.reduce((acc, loan) => acc + loan.amount, 0)
    const totalRepayments = await Repayment.countDocuments()
    res.status(200).json({ totalLoans, totalAmount, totalRepayments })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error fetching summary")
  }
}
)

// GET Overdue Loans

app.get("/overdue", authenticateToken, async (req, res) => {
  try {
    const overdueLoans = await Loan.find({ status: "pending" });
    res.status(200).json(overdueLoans);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching overdue loans");
  }
}
)

app.get('/receipt/:id', async (req, res) => {
  
  const{id} = req.params
  const loan  = await Loan.findById(id)
  const cutomerids = loan.customerid
  const custom  = await Customer.findById(cutomerids)
  const repayment = {
    userId : loan.userid,
    repaymentId: req.params.id,
    customerName: custom.name,
    phone: custom.phone,
    amount: loan.amount,
    status :loan.status,
    balance : loan.balance,
  };
   
   generateReceiptPDFStream(res, repayment);
}
)


app.listen(3000, () => {
    console.log('✅ Server is running and DB Connected...')
  });


module.exports = app