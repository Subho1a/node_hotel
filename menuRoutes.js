const express=require('express');
const route=express.Router();
const MenuItem=require('./menu_model'); // Import the MenuItem model


route.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Data Saved");
   
    res.status(200).json({
      message:"Data Saved Successfully",
      data:response});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


route.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetch Successfully");
    res.status(200).json(data);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


route.put('/:id',async(req,res)=>{
  try {
    const foodId=req.params.id;
    const updatedFood=req.body;

    const response=await MenuItem.findByIdAndUpdate(foodId,updatedFood,{
      new:true,
      runValidators:true,
    })
    console.log('data updated')
    res.status(200).json({
      message:'Data updated Succesfully',
      response
    })

    if(!response){
      return res.status(404).json({error:'Food not found'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'invalid id given'})
  }
})

route.delete('/:id',async(req,res)=>{
  try {
    const foodId=req.params.id;
    const del_food=await MenuItem.findByIdAndDelete(foodId);
    console.log('data deleted')
    res.status(200).json({
      message:'Data deleted succefully',
      data:del_food,
    })

    if(!del_food){
      return res.status(404).json({error:'invalid Id'})
    }
    
  } catch (error) {
    
     console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    
  }
})




module.exports=route;