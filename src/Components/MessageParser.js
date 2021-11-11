class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase()
    if(!isNaN(lowerCaseMessage))
    {
     

      const axios = require('axios');
      var f=0;
      var token = localStorage.getItem("Token")
    console.log("Bearer " + token)
    axios.get('https://userapiforltiproject.azurewebsites.net/api/Query/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': "Bearer " + token.replace(/['"]+/g, '')
      },
    }).then(resp => {
         
        
           console.log(resp.data);
           for(var i=0;i<resp.data.length;i++){
              console.log(resp.data[i].Department);
              if (lowerCaseMessage.includes(resp.data[i].QueryId)) {
                  this.actionProvider.mani(resp.data[i].QueryId)
                  f=1
                  break;
                }
                

           }
           if(f==0)
           this.actionProvider.greet("Sorry we dont have that Query info")
           
  
        }); 
      
      
    }else if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet("hello")
    }else{
      if(lowerCaseMessage=="y")
      {

        this.actionProvider.greet("Thank you for your feedback ")

      }else if(lowerCaseMessage=="n")
      {
        this.actionProvider.greet("Sorry for your incovinience you can contact to Our admin ")
      }else{
        console.log("Parroll strinng")
        console.log(lowerCaseMessage);
      const axios = require('axios');
  var f=0;
  var token = localStorage.getItem("Token")
  console.log("Bearer " + token)
  axios.get('https://userapiforltiproject.azurewebsites.net/api/Query/', {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': "Bearer " + token.replace(/['"]+/g, '')
    },
  }).then(resp => {
         
        
          
           for(var i=0;i<resp.data.length;i++){
             
              if (lowerCaseMessage.includes(resp.data[i].Department)) {
                  this.actionProvider.mani(resp.data[i].Department)
                  f=1
                     break;
                }
                

           }
           if(f==0)
           this.actionProvider.greet("Sorry we dont have that department")
           
  
        }); 
      }
      }
    
     
  }
}

export default MessageParser;