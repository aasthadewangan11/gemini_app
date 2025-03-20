const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json());

app.post('/getResponse', (req, res) => {
  console.log(req.body.question);
  const genAI = new GoogleGenerativeAI("AIzaSyALoJ_Uu8knzZejG10XJV1Ax78RQQ4X568");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  model.generateContent(req.body.question)
    .then(result => {
      console.log(result.response.text());

      res.status(200).json({
        response: result.response.text() // Replaced `;` with `,`
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
app.use('*', (req, res) => {
  res.status(404).json({
      msg: 'bad request'
  });
});

// app.get('/abc',(req,res)=>{
//     console.log('hi')
// })

module.exports = app;
