import { request } from "http";
import { url } from "inspector";
import dbconnect from "@/lib/dbconnect";
import user from "@/lib/models";


export async function GET(request:Request){
    const {searchParams}=new URL(request.url)//creates a url object and extract searchparams property
    const id  = searchParams.get("id")
   



    await dbconnect()
    const data=await user.findById(id)
    return Response.json(data)



}