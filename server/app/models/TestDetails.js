//Including Mongoose model...
var mongoose = require('mongoose');
//creating object 
var Schema = mongoose.Schema;

var TestSchema = new Schema({
      testName: {type: String, required: true},
      testCategory: {type: String, required: true},
      totalScore: {type: Number,default: 100,required: true},
      totalQuestions: {type: Number,default: 10},
      testDetails: {type: String},
      testDuration: {type: Number,default: 30},
      questions: []

}, { usePushEach: true });

 module.exports = mongoose.model('TestDetails', TestSchema); 

