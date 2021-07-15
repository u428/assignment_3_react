
import React,{Component} from 'react';
import { BrowserRouter, Route , Switch, withRouter } from 'react-router-dom';
import Header from './utills/Header';
import Login from './utills/Login';
import Home from './utills/Home';
import SingUp from './utills/SingUp';
import {getCurrentUser, getUserRole} from './api/ApiHelper';
import {ACCESS_TOKEN} from './constants/enams';
import Settings from './utills/Settings';
import PostCategory from './admin/PostCategory';
import PostProduct from './admin/PostProduct';
import AllInvoices from './admin/AllInvoices';
import Users from './admin/Users';
import Products from './admin/Products';
import ProductPage from './utills/page/ProductPage';
import Karzinka from './utills/page/Karzinka';
import SeeMore from './utills/page/SeeMore';
import Invoices from './utills/page/Invoices';

class App extends Component {
  constructor(props){
  super(props);
 this.state={
      currentUser: [],
      isAuthenticated: false,
      isLoading: false,
      role: ''
    }
  }

  loadCurrentUser=()=>{
    if(localStorage.getItem(ACCESS_TOKEN)){
    getCurrentUser().then(response => {
      this.setState({
        currentUser: response.data,
        isAuthenticated: true,
        isLoading: false
      });
    })

  }
  }
  getLoaderRole=()=>{
    if(localStorage.getItem(ACCESS_TOKEN)){
    getUserRole().then(response =>{
      this.setState({
        role: response.data
      });
    }).catch(error=> console.log(error));
  }}

  componentDidMount(){
    this.setState({
      isLoading:true
    })
    this.loadCurrentUser();
    this.getLoaderRole();
}


handleLogOut=()=> {
  localStorage.removeItem(ACCESS_TOKEN);
  this.setState({
    currentUser: [],
    isAuthenticated: false,
    isLoading: true
  });
  // this.props.history.push('/logIn');
}

  render(){
    if(!this.state.isAuthenticated && this.state.isLoading){
      return (
        <>
        <BrowserRouter>
         <Header isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}></Header>
            <Switch>
              <Route path="/signUp" exact component={SingUp} ></Route>
              <Route path={["/login","/"]} component={Login} ></Route>
              {/* <Route path={["/login","/"]} render={(props) => <Login/>} /> */}
            </Switch>
        </BrowserRouter>
        </>
      );
    }else if(!this.state.isLoading && this.state.isAuthenticated) {
      if(this.state.role ==='ADMIN'){
        return (
          <BrowserRouter>
          <Header isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} logout={this.handleLogOut} role={this.state.role}></Header>
              <Switch>
                <Route path='/' exact component={Home}></Route>
                <Route path='/category' exact component={PostCategory}></Route>
                <Route path='/setProduct' exact component={PostProduct}></Route>
                <Route path='/editProduct/:id' exact component={Products}></Route>
                <Route path='/invoice' exact component={AllInvoices}></Route>
                <Route path='/settings' exact component={Settings}></Route>
              </Switch>
          </BrowserRouter>
        );
      }else{
      return (
        <BrowserRouter>
        <Header isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} logout={this.handleLogOut} role={this.state.role}></Header>
            <Switch>
              <Route path='/' exact component={ProductPage}></Route>
              <Route path='/karzinka' exact component={Karzinka}></Route>
              <Route path='/seeMore/:id' exact component={SeeMore}></Route>
              <Route path='/invoice' exact component={Invoices}></Route>
              <Route path='/payment' exact component={Home}></Route>
              <Route path='/settings' exact component={Settings}></Route>
            </Switch>
        </BrowserRouter>
      );
      }
    }
    else{
      return(
        <div>is Loading</div>
      )
    }
  }
}

export default App;
