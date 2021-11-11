class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet(a) {
    const axios = require('axios');
    if (a.includes("hello")) {

      const greetingMessage1 = this.createChatBotMessage("The followings are the query departments")
      this.updateChatbotState(greetingMessage1)
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
        var dep = [];
        var dp = " ";
        var count = 0;
        for (var i = 0; i < resp.data.length; i++) {
          if (dep.indexOf(resp.data[i].Department) === -1) {
            count++;
            dep.push(resp.data[i].Department)
            dp = dp + " " + count + " " + resp.data[i].Department + "\n";

          } else {




          }


        }
        const greetingMessage = this.createChatBotMessage(dp)
        this.updateChatbotState(greetingMessage)
        const greetingMessage2 = this.createChatBotMessage("Type the department name of your query")
        this.updateChatbotState(greetingMessage2)


      });
    } else {
      const greetingMessage = this.createChatBotMessage(a)
      this.updateChatbotState(greetingMessage)
    }
  }
  mani(b) {
    const axios = require('axios');


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

      if (!isNaN(b)) {
        for (var i = 0; i < resp.data.length; i++) {
          //  console.log(resp.data[i].Department);
          if (b == resp.data[i].QueryId) {
            // const greetingMessage1 = this.createChatBotMessage("press"+b+"for"+resp.data[i].queryname)
            // this.updateChatbotState(greetingMessage1)
            const greetingMessage = this.createChatBotMessage(resp.data[i].Descript)
            this.updateChatbotState(greetingMessage)
            const greetingMessage1 = this.createChatBotMessage("If it resolved your query then press y else press n")
            this.updateChatbotState(greetingMessage1)

          }

        }

      } else {
        for (var i = 0; i < resp.data.length; i++) {
          //   console.log(resp.data[i].Department);
          if (b == resp.data[i].Department) {
            console.log("check this")
            var s = "press " + resp.data[i].QueryId + " for " + resp.data[i].queryname + " Query ";

            const greetingMessage1 = this.createChatBotMessage(s)
            this.updateChatbotState(greetingMessage1)
            /*  const greetingMessage = this.createChatBotMessage(resp.data[i].Descript)
              this.updateChatbotState(greetingMessage)*/
          }

        }

      }

    });

  }
  updateChatbotState(message) {

    // NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.


    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider;