const express=require('express');
const router=express.Router();
const person=require('./person_model.js')
const { jwtAuthenticationMiddleware,generateToken } = require('./jwt'); // Import JWT middleware

router.post('/signup', async(req,res)=>{

    try {
        const data=req.body   

    //create new person document using the Mongoose model

    const newPerson=new person(data);
    //save the new person to database
    const response= await newPerson.save();
    console.log('data saved');
const payload = {
        id: response.id,
        username: response.username,
    };
    console.log(JSON.stringify(payload));

    // Generate JWT token
const token = generateToken(payload);
    console.log('Token generated:', token);

    res.status(200).json({ response, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal server error'})
        
    }
    
})

//login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await person.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'invalid username ' });
        }

        // Check if the password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const payload = {
            id: user.id,    
            username: user.username,
        };
        const token = generateToken(payload);
        

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get method to fet data from database

router.get('/', jwtAuthenticationMiddleware, async (req, res) => {
    try {
        const data = await person.find();
        console.log('data Fetch');
        res.status(200).json(data);

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
})

//prfile route
router.get('/profile', jwtAuthenticationMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from JWT payload
        const user = await person.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// work-type

router.get('/:workType',async(req,res)=>{
    try {
        const workType=req.params.workType //etract the work type from url parameter
        if(workType=='chef'|| workType=='Waiter'||workType=='manager'){
            const response=await person.find({work:workType})
             console.log('data Fetch');
             res.status(200).json(response);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'invalid server error'})
        
    }
})


router.put('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;//etract the id from url parameter
        const updatePersonData=req.body;

        const response=await person.findByIdAndUpdate(personId,updatePersonData,{

            new:true,
            runValidators:true,
        })
        console.log('data updated');
        res.status(200).json(response);

        if(!response){
            return res.status(404).json({error:'person not found'})
        }
    } catch (error) {

        console.log(Error)
        res.status(500).json({error:'internal server error'})
        
    }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    const del_response = await person.findByIdAndDelete(personId);

    if (!del_response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data deleted');
    res.status(200).json({message:'Peson deleteted succefully',del_response});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






module.exports=router;