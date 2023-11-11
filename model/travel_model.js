const mongo = require('mongoose');

const my_schema = new mongo.Schema({


  name: {

    type: String,

    req: true,

  },


  email: {

    type:String,

    req:true,

  },


  destination: {

    type:String,

    enum:["Mumbai","Kolkata","Delhi","Shimla","Massorie"],

    req:true,

    default:"Bihar",


  },

  travelers: {

    type:Number,

    req:true,


  },


  budget_per_person: {

    type:Number,

    req:true,

    
  },


});


const my_model = mongo.model('Travel', my_schema);


module.exports = my_model;
