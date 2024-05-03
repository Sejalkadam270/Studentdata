const express=require('express');
const mongoose=require('mongoose');
const routes=require('./routes');

const app=express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/student',{useNewUrlParser:true , useUnifiedTopology:true})
.then(()=> console.log("mongoose connected"))
.catch(err => console.error("something is wrorng",err));

app.use('/api',routes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Sever is connected");
})



// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes');

// const app = express();

// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/music', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// // Mount routes defined in routes.js at the appropriate path
// app.use('/api', routes); // Assuming all routes are under /api

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
