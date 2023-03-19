const mongodb =  require('mongodb')
const dbName = 'MentorandStudentData'
const dbUrl = `mongodb+srv://zen-class-35:Chandru1234@chandruloganathan.ckkhhdb.mongodb.net/${dbName}?retryWrites=true&w=majority`
const MongoClient = mongodb.MongoClient;

module.exports = {mongodb,dbName,dbUrl,MongoClient}