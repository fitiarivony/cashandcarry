class FetchHelper{
    getData=(url)=>{
        fetch(url,{crossDomain:true,method:'GET',headers:{}})
        .then(res=>{return res.json() ; })
        .then(data=>{ 
            console.log(data);
            return data;
         })
    }
    getDataPost=(url,info)=>{
        // main.js

    // POST request using fetch()
        fetch(url, {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify(info),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json =>{ console.log(json);
        return json ;   });

    }
}

export default FetchHelper;