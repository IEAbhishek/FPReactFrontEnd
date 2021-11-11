import React, { Component } from "react"
import Nav from "./Components/Nav"
import Home from "./Components/Home"
import Login from "./Components/Login"
import CNA from "./Components/CNA"
import Admin from "./Components/Admin"
import Details from "./Components/Details"
import Chat from "./Components/Chat"
import Hosttimer from "./Components/Hosttimer"
import './App.css'
import { BrowserRouter as Roooo, Routes, Route } from "react-router-dom"

function App() {
  return (

    <Roooo>
      <div className = "App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Chat" element={<Chat />} />          
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/CNA" element={<CNA />} />
          <Route exact path="/Admin" element={<Admin />} />
          <Route exact path="/Details" element={<Details />} />
          <Route exact path = "/Hosttimer" element = {<Hosttimer/>} />
        </Routes>
      </div>
    </Roooo>
  );
}

export default App;
