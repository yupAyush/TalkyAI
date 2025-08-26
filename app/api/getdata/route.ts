import dbconnect from "@/lib/dbconnect";
import user from "@/lib/models";


export async function GET(request:Request){
    try {

            
            const { searchParams } = new URL(request.url);
            const usernamee= searchParams.get("username");
            await dbconnect()
            const data =await user.find({username:usernamee})
            console.log("data is ",data)
            return Response.json(data)
        
    } catch (error) {
        console.error("Error fetching data:", error);
        return Response.json({ error: "Failed to fetch data" }, { status: 500 });
        
    }

  
        
   
}
