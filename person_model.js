const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "Waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,

    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  addres: {
    type: String,
  },
  salary: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// Ensure indexes are created
personSchema.index({ email: 1 }, { unique: true });
personSchema.index({ mobile: 1 }, { unique: true });

personSchema.pre("save", async function (next) {
  const person = this;

  //hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    person.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword=async function (candidatePassword) {
    try{
        //use bcrypt to compare the provider password with the hased password

        const ismatch=await bcrypt.compare(candidatePassword,this.password);
        return ismatch;
    }
    catch(error){
        throw error;
    }
    
}
 


// create person model
const person = mongoose.model("person", personSchema);
module.exports = person;