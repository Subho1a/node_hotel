const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const person = require('./model'); // Import the person model

// Passport local strategy for authentication
passport.use(new LocalStrategy(async(USERNAME,PASSWORD,done)=>{
    try {
        // console.log('received Credentisls:',USERNAME, PASSWORD);
        const user= await person.findOne({username:USERNAME});

        if(!user)
            return done(null,false,{message:'incorrect username'})
        
        const isPassword= await user.comparePassword(PASSWORD);
        if(isPassword){
            return done(null,user);
        }
        if(!isPassword){
            return done(null,false,{message:'incorrect password'})
        }

    } catch (error) {
        console.error('Error occurred during authentication:', error);
        return done(null,false,{message:'internal server error' })
    }

}));

module.exports = passport; // Export the middleware for use in server.js