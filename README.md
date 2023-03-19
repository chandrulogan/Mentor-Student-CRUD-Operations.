# Mentor-Student-CRUD-Operations.

This is a Node.js application using the Express framework for routing. It defines several routes that interact with a MongoDB database to perform CRUD operations on two collections: "MentorData" and "StudentsData".

The routes include:

GET /mentordata: retrieves all documents from the "MentorData" collection and sends them back as a response.
GET /StudentsData: retrieves all documents from the "StudentsData" collection and sends them back as a response.
GET /mentordata/:id: retrieves a single document from the "MentorData" collection based on the provided ID and sends it back as a response.
POST /addmentor: adds a new document to the "MentorData" collection based on the request body.
POST /addstudent: adds a new document to the "StudentsData" collection based on the request body.
POST /assign-mentor: assigns a mentor to a group of students. It takes in a request body that includes an array of student names and a mentor name. It updates the "mentorName" field for each student document and adds the students' names to the "mentorStudents" array in the mentor document.
POST /assign-students: assigns a group of students to a mentor. It takes in a request body that includes an array of student names and a mentor name. It updates the "studentMentor" field for each student document and adds the mentor's name to the "mentorStudents" array in the mentor document.
