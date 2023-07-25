const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res){
    res.send("hello world 2")
});

const url = 'mongodb+srv://ishtiaqmehmood:deepchain123@cluster0.knnuifz.mongodb.net/';
mongoose.connect(url,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then( ()=>{
    console.log("MongoDb is connected");
    app.listen(port, function(req, res){
        console.log("server is running on port 4000")
    })
}

)
// followoing code is used to saved one entry into mongodb atlas directly
// const employeesSchema =  new mongoose.Schema({
//     name: String,
//     designation: String
// })

// const employees = mongoose.model('employees', employeesSchema);

// const newdata = new employees({
//     name: "ishtiaq",
//     designation: "web developer"
// });

// newdata.save();

const employeesSchema = mongoose.Schema({
    name: String,
    designation: String
});
const Record = mongoose.model('Record', employeesSchema);


app.use(express.json());
app.post('/data', async (req, res) => {
    const { name, designation } = req.body;
    const newrecord = new Record ({ name, designation });
  
    try {
      await newrecord.save();
      res.status(201).json(newrecord);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get('/reports', async (req, res) => {
    try {
      const records = await Record.find();
      
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete('/reports/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRecord = await Record.findByIdAndDelete(id);
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Employees not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

