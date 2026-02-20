const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const styles = `
<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(120deg, #b3f2f6,#b3f2f6);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }
    .card {
        background: #ffffff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        width: 380px;
        text-align: center;
    }
    h2 {
        margin-bottom: 25px;
        color: #1f3c88;
        font-weight: 600;
    }
    input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #dcdcdc;
        border-radius: 6px;
        font-size: 14px;
        transition: 0.3s ease;
    }
    input:focus {
        border-color: #39a0ed;
        box-shadow: 0 0 6px rgba(57, 160, 237, 0.4);
        outline: none;
    }
    button {
        width: 100%;
        padding: 12px;
        margin-top: 15px;
        background-color: #1f3c88;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s ease;
    }
    button:hover {
        background-color: #163172;
        transform: translateY(-2px);
    }
    .result-text {
        margin-top: 15px;
        font-size: 16px;
        color: #333;
    }
    .highlight {
        font-weight: 600;
        color: #1f3c88;
    }
    a {
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        color: #39a0ed;
        font-weight: 500;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
`;
app.get("/", function (req, res) {
    res.send(`
        <html>
        <head>
            <title>BMI Calculator</title>
            ${styles}
        </head>
        <body>
            <div class="card">
                <h2>BMI Calculator</h2>
                <form action="/bmicalculator" method="POST">
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="number" step="0.01" name="height" placeholder="Height (in meters)" required>
                    <input type="number" step="0.1" name="weight" placeholder="Weight (in kg)" required>
                    <button type="submit">Calculate BMI</button>
                </form>
            </div>
        </body>
        </html>
    `);
});
app.post("/bmicalculator", function (req, res) {
    const name = req.body.name;
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight / (height * height);
    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi <= 24.9) {
        category = "Normal Weight";
    } else if (bmi <= 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }
    res.send(`
        <html>
        <head>
            <title>BMI Result</title>
            ${styles}
        </head>
        <body>
            <div class="card">
                <h2>BMI Result</h2>
                <p class="result-text">Name: <span class="highlight">${name}</span></p>
                <p class="result-text">Your BMI is: <span class="highlight">${bmi.toFixed(2)} kg/m²</span></p>
                <p class="result-text">Category: <span class="highlight">${category}</span></p>
                <a href="/">Calculate Again</a>
            </div>
        </body>
        </html>
    `);
});
app.listen(3000, function () {
    console.log("Server running on port 3000");
});