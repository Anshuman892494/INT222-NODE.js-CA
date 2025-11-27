const express = require('express')
const app = express()

const { body, validationResult } = require('express-validator')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(`
        <form action="/validatedata" method="post">
        <h1>Student Registration</h1>
        <input type="text" name="username" placeholder="Enter name" required><br><br>
        <input type="password" name="password" placeholder="Enter password" id="password" required><br><br>
        <input type="email" name="email" placeholder="Enter email" id="email" required><br><br>
        <input type="submit" value="submit"></form>
        `)
})
app.post('/validatedata', [
    body('email').isEmail().trim(),
    body('password').isLength({ min: 8 }).trim(),
    body('username').trim()
],
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.send(errors)
        }
        else {
            res.send('Form Validate successfully')
        }
    })

app.listen(3000, () => {
    console.log("server running...")
}) 