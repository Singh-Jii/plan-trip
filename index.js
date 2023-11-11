require("dotenv").config();

const exp=require("express");


const cp=require("cors");


const {my_connect}=require("./database");


const {my_route}=require("./route/travel_route");


const my_application=exp();


my_application.use(exp.json());


my_application.use(cp());


my_application.get("/",async(request,response)=>{


    return response.status(200).send({msg:`all endpoints present here`});


})


my_application.use("/",my_route);


my_application.all("*",async(request,response)=>{


    return response.status(404).send("error");


})


my_application.listen(process.env.my_port,async()=>{


    try {


        await my_connect;


        console.log("connected to mongodb");


    } 
    

    catch (er) {


        console.log(er.msg);


    }


    console.log(`${process.env.my_port}`);

    
})