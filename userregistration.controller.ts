import express,{ Express,Request,Response } from "express";
const d = require("./dbconnection")
import { User } from "./models";
import { createUserId } from "./commons.service";
import { log } from "console";
import { cibilScoreValidqation } from "./cibil.service";
import { getReportByPan } from "./dbconnection";


export const router =express.Router()

router.post("/register/user",async(req:Request,res:Response)=>{
    try{
        let newuser = {
            name: req.body.name, age: req.body?.age, email: req.body.email, mobilenumber: req.body.mobilenumber, aadhar: req.body.aadhar,
            userId: createUserId(req.body.name), pan: req.body.pan
        }
        let respose = await d.addUserToDB(newuser);
        console.log(respose,"gg");
        
        return  res.send({
            "ok":true,"message":"user added sucessfully"
        })
    }
    catch(e){
       res.send(e);
       console.log(e,"errpr");
       
    }

    

})

router.get("/generateReport/:id",async(req:Request,res:Response)=>{
    try{
        let report =await  d.getReport(parseInt(req.params.id));
        console.log(report,"report");
        let approvalData = await cibilScoreValidqation(report);
        console.log( "report1", approvalData);
        await d.approvalDataAddToDb(approvalData);
        console.log(report, "report", approvalData);
        
        return res.status(200).send({
            "message":"report generated Sucessfully",
            report:report
        })
    }
    catch(e){
        console.error(e,"error");
        res.send(500);
    }

})

router.get("/getreport/:panId",async(req:Request,res:Response)=>{
    try{
        let reportData = await getReportByPan(parseInt(req.params.panId))
        return  res.send({
            "message": "report obyained sucessfully",
            data: reportData
        })
    }
    catch(e){
        console.error(e,"erroe at report getting");
        throw new Error("error while getting report");
    }
   

})

