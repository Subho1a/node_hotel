const express=require('express');
const router=express.Router();
const person=require('./model.js')

router.post('/', async(req,res)=>{

    try {
        const data=req.body   

    //create new person document using the Mongoose model

    const newPerson=new person(data);
    //save the new person to database
    const response= await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal server error'})
        
    }
    
})

//get method to fet data from database

router.get('/',async(req,res)=>{
    try{
        const data=await person.find();
         console.log('data Fetch');
    res.status(200).json(data);

    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
})

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