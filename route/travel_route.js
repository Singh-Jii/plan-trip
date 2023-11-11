const {my_router}=require("express");


const my_route=my_router();


const {my_model}=require("../model/travel_model");


my_route.post("/post_data", async(request,response)=>{


    try {


        const {name,email,destination,travelers,budget_per_person}=request.body;


        let my_trvl=new my_model({name,email,destination,travelers,budget_per_person});


        await my_trvl.save();


        response.status(200).send({ 
            
            "success": true, 
            
            "msg": "registration completed"
        
        })

    }
    
    catch (er) {


        response.status(400).send({"er":er.msg});


    }


})

my_route.get("/retrieve_data",async(request,response)=>{


    try {


        const my_travel = await my_model.find();

        response.status(200).send({ 
            
            success: true, 
            
            msg: "get travel details ", 
            
            item:my_travel});

      } 
      
      catch (er) {

        response.status(400).send({ er: er.msg });


      }

})


my_route.delete("/delete_data/:id",async(request,response)=>{


    try {


        const travel_id = req.params.id;

        let trv=await my_model.findByIdAndDelete(travel_id);


        response.status(200).send({
            
            success:true,
            
            msg:"delete"});


      } 
      
      catch (er) {


        response.status(400).send({ 
            
            success: false, 
            
            er: er.msg 
        
        });


      }


})


my_route.get("/filter_data/filter", async (request, response) => {


    try {


        const { destination, my_sorting } = request.qstn;


        let qstn = {};


        if (destination) {


            qstn.destination = destination;


        }

        let choose = {};

        if (my_sorting === "ascending") {


            choose = { budget_per_person: 1 };

        } 
        
        else if (my_sorting ==="descending") {


            choose = { budget_per_person: -1 };


        }


        const my_travel = await my_model.find(qstn).sort(choose);


        response.status(200).send({ 
            
            success: true, 
            
            msg: "sorting and filtering done", 
            
            item: my_travel 
        
        
        });


    }
    
    
    catch (er) {


        response.status(400).send({ er: er.msg });


    }

    
})


module.exports={my_route}