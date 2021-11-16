import React, { Component } from 'react'
import {loginApi} from '../api/ApiHelper';
import {ACCESS_TOKEN} from '../constants/enams';

export default class Login extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            isShown: 'password',
            phone: '',
            password: ''
        }
    }
    
    change =(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit =(e)=>{
        e.preventDefault();
        const A={
            login: this.state.phone,
            password: this.state.password
        }
        loginApi(A).then(res =>{   
            console.log(res);
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.headers.authorization);
                // this.props.history.push("/");
                // this.props.hostory.go("/")
                window.location.reload();
               
            }
        })
    }


    render() {
       
        return (
    <div className="cotainer mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card bg-light">
                    <div className="card-header">Log In</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Tel Nomer</label>
                                <div className="col-md-6">
                                    <input  type="text" className="form-control"name="phone" value={this.state.phone} onChange={this.change} placeholder="Ex: xx xxx xx xx" required autoFocus />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Password</label>
                                <div className="col-md-6">
                                    <input type="password" className="form-control" value={this.state.password}  onChange={this.change} name="password" placeholder="Enter your password" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember" /> Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Log In
                                </button>
                                <a href="#" className="btn btn-link">
                                    Forgot Your Password?
                                </a>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
        )
    }
}
