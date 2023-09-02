import { log } from "console";
import { MongoClient } from "mongodb";
import { User, collection_name } from "./models";
let connect:any

export const ConnectionToDb=async ()=>{
    try{
        let connectq=await new MongoClient(process.env.DB_URL || "");
        connect = connectq
        console.log("connected to Db Sucessfully");
    }
    catch(e){
        console.log(e,"erroe at db Connection");
        
    }

}

export const addUserToDB = async (userData:User) => {
    return await connect.db(process.env.Db).collection(collection_name.Users).insertOne(userData);
}

export const getReport=async(panId:number)=>{
    
    return await connect.db(process.env.Db).collection(collection_name.Cibil).find({pan:panId}).toArray()
}

export const approvalDataAddToDb=async (reportData:any)=>{
    return await connect.db(process.env.Db).collection(collection_name.Approval).insertOne(reportData)
}
export const getReportByPan=async(panid:number)=>{
    return await connect.db(process.env.Db).collection(collection_name.Approval).find({pan:panid}).toArray()

}