const express = require('express');
const router = express.Router();  
const Student = require('./models/Student');

// Route to insert 5 song documents

router.post('/insertStudent',async(req,res)=>{

    const student=[
     {Name:"Sejal Anil Kadam",Roll_No:33331, WAD_Marks:45,CC_Marks:40, DSBDA_Marks:56,CNS_Marks:67,AI_marks:58},
     {Name:"Ashutosh patil",Roll_No:33302, WAD_Marks:49,CC_Marks:60, DSBDA_Marks:50,CNS_Marks:87,AI_marks:78},
     {Name:"Sejal Anil Kadam",Roll_No:33331, WAD_Marks:45,CC_Marks:40, DSBDA_Marks:56,CNS_Marks:67,AI_marks:58},
     {Name:"Sejal Anil Kadam",Roll_No:33331, WAD_Marks:45,CC_Marks:40, DSBDA_Marks:56,CNS_Marks:67,AI_marks:58},
     {Name:"Sejal Anil Kadam",Roll_No:33331, WAD_Marks:45,CC_Marks:40, DSBDA_Marks:56,CNS_Marks:67,AI_marks:58},
    ];

    try{
     const studentinsert = await Student.insertMany(student);
     console.log("Inserted Succesfully",studentinsert);
     res.send(`Inserted ${studentinsert.length} Sucessfully`);
    }
    catch(err){
        console.error("Something went wrong!!!!!",err);
        res.status(500).send("Something is wrong");
    }

});
// router.post('/insertSongs', async (req, res) => {
//     const songs = [
//         { Songname: 'Song1', Film: 'Film1', Music_director: 'MD1', singer: 'Singer1', Actor:'Hello1', Actress:'hey1'},
//         { Songname: 'Song2', Film: 'Film2', Music_director: 'MD2', singer: 'Singer2', Actor:'Hello2', Actress:'hey2'},
//         { Songname: 'Song3', Film: 'Film3', Music_director: 'MD1', singer: 'Singer3', Actor:'Hello3', Actress:'hey3'},
//         { Songname: 'Song4', Film: 'Film4', Music_director: 'MD3', singer: 'Singer1', Actor:'Hello4', Actress:'hey4'},
//         { Songname: 'Song5', Film: 'Film5', Music_director: 'MD2', singer: 'Singer4', Actor:'Hello5', Actress:'hey5'}
//     ];
   
//     try {
//         const insertedSongs = await Song.insertMany(songs);
//         console.log("Inserted songs:", insertedSongs);
//         res.send(`Inserted ${insertedSongs.length} songs successfully`);
//     } catch (err) {    
//         console.error('Error inserting songs:', err);
//         res.status(500).send('Error inserting songs');
//     }
// });


router.get('/totalStudent',async(req,res)=>{
try{
const totalStudents=await Student.countDocuments();
console.log(`total songs:${totalStudents}`);
res.send(`Total Songs:${totalStudents}`);
}
catch(err){
console.log("wrong......",err);
res.status(500).send("ERRRRRRR");
}
});

// router.get('/totalSongs', async (req, res) => {
//     try {
//         const count = await Song.countDocuments();
//         res.send(`Total songs: ${count}`);
//     } catch (err) {
//         console.error('Error fetching total songs:', err);
//         res.status(500).send('Error fetching total songs');
//     }
// });

// Route to list all documents

router.delete('/deleteStudent/:studentId',async(req,res)=>{
    const delstu=req.params.studentId;

    try{
       const studel=await Student.findByIdAndDelete(delstu);
       if(!studel){
        res.status(404).send("Song not found");
       }
       res.send("deleted Succesfully........");
    }
    catch(err){
        console.error('Error listing student:', err);
    res.status(500).send('Error listing student');
    }
})


router.get('/studentsAbove20DSBDA',async(req,res)=>{
    try{
        const student=await Student.find({DSBDA_Marks:{$gt : 20}});
        res.send(`Student ${student}`);
    }
    catch(err){
        console.error('Error listing student:', err);
    res.status(500).send('Error listing student');
    }
})

// router.get('/studentsAbove20DSBDA', async (req, res) => {
//     try {
//         const students = await Student.find({ DSBDA_Marks: { $gt: 20 } }, 'Name');
//         res.json(students);
//     } catch (err) {
//         console.error('Error fetching students:', err);
//         res.status(500).send('Error fetching students');
//     }
// });

router.put('/updateMarks/:studentId',async (req,res)=>{

    const studentId=req.params.studentId;

    try{

        const updatedStudent=await Student.findByIdAndUpdate(studentId,{$inc:{ WAD_Marks: 10,
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
            AI_marks: 10}},{new:true});

            if(!updatedStudent){
                res.status(404).send("Error in Song...............");
            }

            res.json(updatedStudent);

    }
    catch(err){

        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');

    }

})

// router.put('/updateMarks/:studentId', async (req, res) => {
//     const studentId = req.params.studentId;
//     try {
//         const updatedStudent = await Student.findByIdAndUpdate(studentId, { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_marks: 10 } }, { new: true });
//         if (!updatedStudent) {
//             return res.status(404).send("Student not found");
//         }
//         console.log("Updated student:", updatedStudent);
//         res.send(`Marks updated successfully: ${updatedStudent}`);
//     } catch (err) {
//         console.error('Error updating student marks:', err);
//         res.status(500).send('Error updating student marks');
//     }
// });

router.get('/studentsAbove25AllSubjects',async(req,res)=>{
    try {

        const students= await Student.find({
            WAD_Marks: {$gt:25},
            CC_Marks:  {$gt:25},
            DSBDA_Marks: {$gt:25},
            CNS_Marks:  {$gt:25},
            AI_marks: {$gt:25}
        })
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');
    }
});

router.get('/studentsBelow40MathsScience', async (req, res) => {
    try {
        const students = await Student.find({ WAD_Marks: { $lt: 40 }, DSBDA_Marks: { $lt: 40 } }, 'Name');
        res.json(students);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');
    }
});

router.delete('/deleteStudent/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }
        res.send("Student deleted successfully");
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Error deleting student');
    }
});

router.get('/studentsTable',async(req,res)=>{
    try{
    const students= await Student.find();

    res.send(`
<style>
table{
    border-collapse:collapse;
    width:100%;
}
th,td{
    border: 1px solid black;
    padding: 8px;
text-align: left;
}
th{
    background-color:white;
}
</style>
<table>
<tr>
<th>Name</th>
<th>Roll No</th>
<th>WAD_Marks</th>
<th>CC_Marks</th>
<th>DSBDA_Marks</th>
<th>CNS_Marks</th>
<th>AI_marks</th>
</tr>
${students.map(student=>`
<tr>
<td>${student.Name}</td>
                       <td>${student.Roll_No}</td>
                         <td>${student.WAD_Marks}</td>
                       <td>${student.CC_Marks}</td>
                      <td>${student.DSBDA_Marks}</td>
                      <td>${student.CNS_Marks}</td>
                                           <td>${student.AI_marks}</td>
</tr>
`).join('')}
</table>
    `);
    }
    catch(err){
        console.error('Error deleting student:', err);
        res.status(500).send('Error deleting student');
    }

});

// router.get('/studentsTable', async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.send(`
//             <style>
//                 table {
//                     border-collapse: collapse;
//                     width: 100%;
//                 }
//                 th, td {
//                     border: 1px solid black;
//                     padding: 8px;
//                     text-align: left;
//                 }
//                 th {
//                     background-color: #f2f2f2;
//                 }
//             </style>
//             <table>
//                 <tr>
//                     <th>Name</th>
//                     <th>Roll No</th>
//                     <th>WAD Marks</th>
//                     <th>CC Marks</th>
//                     <th>DSBDA Marks</th>
//                     <th>CNS Marks</th>
//                     <th>AI Marks</th>
//                 </tr>
//                 ${students.map(student => `
//                     <tr>
//                         <td>${student.Name}</td>
//                         <td>${student.Roll_No}</td>
//                         <td>${student.WAD_Marks}</td>
//                         <td>${student.CC_Marks}</td>
//                         <td>${student.DSBDA_Marks}</td>
//                         <td>${student.CNS_Marks}</td>
//                         <td>${student.AI_marks}</td>
//                     </tr>
//                 `).join('')}
//             </table>
//         `);
//     } catch (err) {
//         console.error('Error displaying students in tabular format:', err);
//         res.status(500).send('Error displaying students in tabular format');
//     }
// });

module.exports = router;


// Define other routes for remaining tasks (p to v)

