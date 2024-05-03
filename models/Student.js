const mongoose = require('mongoose');

const studentMarksSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number
});

module.exports = mongoose.model('Studentmark', studentMarksSchema); // Model name should be consistent with the collection name
