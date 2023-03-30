
class FetchHelper{
     static getData= async (url)=>{
       console.log(url);
       const response=await fetch(url,
        {
            crossDomain:true,
            method:'GET',
            headers:{}
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      
        console.log(data);
        return  data;
    }

    
   static getDataPost=async (url,info)=>{
        // main.js

    // POST request using fetch()
       const response=await fetch(url, {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify(info),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    static post=async (url)=>{
        // main.js

    // POST request using fetch()
       const response=await fetch(url, {
        
            // Adding method type
            method: "POST",
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

}




export default FetchHelper;