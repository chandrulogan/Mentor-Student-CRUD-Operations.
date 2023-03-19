var express = require('express');
var router = express.Router();

const {mongodb,dbName,dbUrl,MongoClient} = require('../dbConfig');
const client = new MongoClient(dbUrl);

/* Get mentors data */
router.get('/mentordata', async(req, res)=>{
    client.connect();
    try {
      const db = client.db(dbName)
      const requests = await db.collection('MentorData').find().toArray();
      res.send({
        statusCode:200,
        data: requests
      })
    } catch (error) {
      console.log(error);
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
    } finally{
      client.close
    }
});

//Get students data
router.get('/StudentsData', async(req, res)=>{
  client.connect();
  try {
    const db = client.db(dbName)
    const requests = await db.collection('StudentsData').find().toArray();
    res.send({
      statusCode:200,
      data: requests
    })
  } catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Internal Server Error",
      error
    })
  } finally{
    client.close
  }
});

router.get('/mentordata/:id', async(req, res)=>{
   client.connect();
    try {
      const db = client.db(dbName)
      const requests = await db.collection('MentorData').findOne({_id:new mongodb.ObjectId(req.params.id)});
      res.send({
        statusCode:200,
        data: requests
      })
    } catch (error) {
      console.log(error);
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
    } finally{
      client.close
    }
});

//Add Mentor
router.post('/addmentor', async(req, res)=>{
  client.connect();
    try {
      const db = client.db(dbName)
      const requests = await db.collection('MentorData').insertOne(req.body);
      res.send({
        statusCode:200,
        message: "Data Saved Successfully"
      })
    } catch (error) {
      console.log(error);
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
    } finally{
      client.close
    }
});

//Create Student
router.post('/addstudent', async(req, res)=>{
  client.connect();
    try {
      const db = client.db(dbName)
      const requests = await db.collection('StudentsData').insertOne(req.body);
      res.send({
        statusCode:200,
        message: "Data Saved Successfully"
      })
    } catch (error) {
      console.log(error);
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error
      })
    } finally{
      client.close
    }
});

//Assign mentor to students
router.post("/assign-mentor", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("MentorandStudentData");
    if (req.body.studentsName) {
      // updating mentor Name for all selected students
      req.body.studentsName.map(async (e) => {
        const stu = await db.collection("StudentsData").updateOne(
          { "studentName": e },
          { $set: { "mentorName": req.body.mentorName } }
        );
      });
    }
    if (req.body.mentorName) {
      // updating students name for selected mentor
      const men = await db.collection("MentorData").findOne({
        "mentorName": req.body.mentorName,
      });
      // console.log(men.mentorStudents);
      req.body.mentorStudents.map((i) => {
        // pushing all the students newly assigned to the selected mentor
        men.mentorStudents.push(i);
      });
      // console.log(men.mentorStudents);
      const update = await db
        .collection("MentorData")
        .updateOne(
          { "mentorName": req.body.mentorName },
          { $set: { "mentorStudents": men.mentorStudents } }
        );
    }
    res.status(200).json({
      message: "Mentor and Students Mapped Successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    client.close();
  }
});

//Assigning students to mentor
router.post("/assign-students", async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("MentorandStudentData");
    if (req.body.studentsName) {
      // updating mentor Name for all selected students
      req.body.studentsName.map(async (e) => {
        const stu = await db.collection("StudentsData").updateOne(
          { "studentName": e },
          { $set: { "studentMentor": req.body.mentorName } }
        );
      });
    }
    if (req.body.mentorName) {
      // updating students name for selected mentor
      const men = await db.collection("MentorData").findOne({
        "mentorName": req.body.mentorName,
      });
      // console.log(men.mentorStudents);
      req.body.mentorStudents.map((i) => {
        // pushing all the students newly assigned to the selected mentor
        men.mentorStudents.push(i);
      });
      // console.log(men.mentorStudents);
      const update = await db
        .collection("MentorData")
        .updateOne(
          { "mentorName": req.body.mentorName },
          { $set: { "mentorStudents": men.mentorStudents } }
        );
    }
    res.status(200).json({
      message: "Mentor and Students Mapped Successfully!",
    });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    client.close();
  }
});

module.exports = router;