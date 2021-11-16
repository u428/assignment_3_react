import React from 'react'
import { Link, withRouter} from 'react-router-dom'
  

function Header(props){



  if(!props.isAuthenticated){
    return(
      <div className="container">
      <h3>
          Assignment 3
      </h3>
      <ul className="nav nav-tabs justify-content-end" role="tablist">
          
          <li className="nav-item mr-sm-5">
              <Link className="nav-link "  to="/signUp">
                  Sign Up
              </Link >
          </li>

          <li className="nav-item mr-sm-5">
              <Link className="nav-link" to="/login">
                  Login
              </Link >
          </li>
          
      </ul>
  </div>
    );
  }
  else {
    if(props.role==='ADMIN'){
        return (
            <div className="container">
                <h3>
                    {props.currentUser.name}
                </h3>
                <ul className="nav nav-tabs justify-content-end" role="tablist">

                    <li className="nav-item mr-sm-1">
                        <Link className="nav-link"  to="/">
                            Home
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-1">
                        <Link className="nav-link "  to="/category">
                            Categories
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-1">
                        <Link className="nav-link "  to="/setProduct">
                            Set Products
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-1">
                        <Link className="nav-link "  to="/invoice">
                            All Invoices
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-1">
                        <Link className="nav-link" to="/settings">
                            Settings
                        </Link >
                    </li>

                    <li className="nav-item mr-sm-1">
                        <button className="nav-link" onClick={()=>{props.logout()}}>
                            Log out
                        </button>
                    </li>

                </ul>
            </div>
        );
    }
    else{
        return(
            <div className="container">
                <h3>
                    {props.currentUser.name}
                </h3>
                <ul className="nav nav-tabs justify-content-end" role="tablist">
                   
                    <li className="nav-item mr-sm-5">
                        <Link className="nav-link"  to="/">
                            Home
                        </Link >
                    </li>
                    
                    <li className="nav-item mr-sm-5">
                        <Link className="nav-link "  to="/karzinka">
                            Karzinka
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-5">
                        <Link className="nav-link "  to="/invoice">
                            Invoice
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-5">
                        <Link className="nav-link" to="/settings">
                            Settings
                        </Link >
                    </li>
                    <li className="nav-item mr-sm-1">
                        <button className="nav-link" onClick={()=>{props.logout()}}>
                            Log out
                        </button>
                    </li>
                    
                </ul>
            </div>
        );
    }
 }
  
  
}


export default withRouter(Header);
