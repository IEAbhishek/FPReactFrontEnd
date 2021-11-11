import { Link, useNavigate } from "react-router-dom";
import React from "react"
import { DropdownButton, Dropdown } from "react-bootstrap";
import whatsapp from './../Whatsapp.jpeg'

function Nav() {

    let user = JSON.parse(localStorage.getItem("document"))
    console.log(user);
    const history = useNavigate();
    function Logout() {
        localStorage.clear();
        history.push("/Login");
    }

    return (
        <div >
            <nav className="navbar">
                <img src={whatsapp} alt="Some chatbot Logo" width="80px" height="80px" class="image" ></img>
                <ul className="nav-links">
                    <Link to="/Home"><li><b>Home</b></li></Link>
                </ul>
                {localStorage.getItem("document") ?
                    <ul className="login">
                        <DropdownButton id="dropdown-basic-button" title={user && user.UserName1}>
                            <Dropdown.Item as={Link} to="/Login" onClick={Logout}>Logout</Dropdown.Item>
                        </DropdownButton>
                    </ul>
                    : null}
            </nav>
        </div>
    );
}

export default Nav;
