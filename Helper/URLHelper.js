class URLHelper  {
    static urlgen(url){
      //  console.log("http://localhost/phpRH/"+url);
        return "http://127.0.0.1:8000/api/"+url;
    }    
}
 
export default URLHelper;