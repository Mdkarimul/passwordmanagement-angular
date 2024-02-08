const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

      full_name:{
        type :String,
        required: [true, 'Please add the full name']
  },
  mobile: {
    type: String,
    required: [true,'Pease enter 10 digits mobile number !']
    },
      email : {
        type : String,
        required : [true, 'Please add the email id'],
        unique : [true, 'Email address already taken !']
      },
      password : {
        type : String,
        required : [true, 'please add the user password']
      }

},
{
    timestamps : true
}
);

module.exports = mongoose.model("User",userSchema);