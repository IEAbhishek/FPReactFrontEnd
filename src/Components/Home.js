import React from "react"
import { Link } from "react-router-dom";
import chatting2 from './../chatting2.jfif'


function Home() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="row text-center my-5">
            <h2 className="title">With LTIBot you can get answers  to all your queries at fingertips. So what are you  waiting  for??</h2>
            <h3>Chat with  bot and get your info now !</h3>
          </div>
          <div className="row text-center py-5 ">
            <Link to="/Login"><button type="button" className="btn btn-secondary border border-dark started">Let's Get Started</button></Link>
          </div>
        </div>
        <div className="col-md-6 py-5">
          <img src={chatting2} alt="Some chatbot image" width="500px" height="400px" ></img>
        </div>


      </div>
    </div>

  );
}

export default Home;


/*<div >
      <h1>Welcome to Helper Bot.....!!!</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum qui cupiditate nulla aliquam, reprehenderit, explicabo rerum excepturi, consequatur quos quia incidunt? Hic enim illo iure dolor est aperiam dignissimos ratione!</p>
      <ul>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
      </ul>
      <Link to = "/Login"><button >Login</button></Link>
    </div>*/
