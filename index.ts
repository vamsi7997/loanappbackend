const express=require('express');
const dotenv=require('dotenv');

import {router} from "./userregistration.controller"
dotenv.config()

const app=express();
app.use(express.json())

import { ConnectionToDb } from "./dbconnection"
const Main=()=>{
    try{
        app.listen(process.env.PORT,()=>{
            console.log("connected");
        })
    }
    catch(e){
        console.log(e,"erroe at connections");
        

    }
}

Main()
ConnectionToDb()
app.use(router);
