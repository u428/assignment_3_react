
import React from 'react'
import {signUpApi} from '../api/ApiHelper';
import {checkPhone} from '../api/ApiHelper';
class SingUp extends React.Component {
    

    constructor(props) {
        super(props)
    
        this.state = {
            name:{
                value: ''
            },
            country:{
                value:''
            },
            address:{
                value:''
            },
            phone:{
                value:''
            },
            password:{
                value: undefined
            },
            confirmPass:{
                value: undefined
            }
        }
        
        this.validatePhoneAvailability=this.validatePhoneAvailability.bind(this);
        this.validateConfPasswordAbility=this.validateConfPasswordAbility.bind(this);
        // this.checkPhone=this.checkPhone.bind(this);
    }
    
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    exporting=(e)=>{
        e.preventDefault();
        if(this.isFormInvalid){
            
            let signupRequest = {
                name: this.state.name.value,
                country: this.state.country.value,
                address: this.state.address.value,
                phone: Number(this.state.phone.value),
                password: this.state.password.value
            }

            signUpApi(signupRequest).then(res=>{
                this.props.history.push("/");
            })

        }
    }

    isFormInvalid() {
        return (
            !this.state.name.validateStatus  &&
            !this.state.country.validateStatus  &&
            !this.state.address.validateStatus &&
            !this.state.phone.validateStatus &&
            !this.state.password.validateStatus &&
            !this.state.confirmPass.validateStatus
        );
    }


render(){
    return (
<div className="cotainer mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card bg-light">
                    <div className="card-header">Sign Up</div>
                    <div className="card-body">
                        <form onSubmit={this.exporting}>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Name</label>
                                <div className="col-md-6">
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter your FirstName"
                                    value={this.state.name.value}
                                    onChange={(event) => this.handleInputChange(event, this.validateName)}
                                    required /> 
                                </div>
                                <label className="col-md-6 col-form-label text-md-right">{this.state.name.errorMsg}</label>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Country</label>
                                <div className="col-md-6">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="country" 
                                    placeholder="Enter your country" 
                                    value={this.state.country.value} 
                                    onChange={(event) => this.handleInputChange(event, this.validateCountry)}
                                    required />
                                </div>
                                <label className="col-md-6 col-form-label text-md-right">{this.state.country.errorMsg}</label>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Address</label>
                                <div className="col-md-6">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="address" 
                                    placeholder="Enter your address"
                                    value={this.state.address.value}
                                    onChange={(event) => this.handleInputChange(event, this.validateAddress)}
                                    required />
                                </div>
                                <label className="col-md-6 col-form-label text-md-right">{this.state.address.errorMsg}</label>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Tel Nomer</label>
                                <div className="col-md-6">
                                <input 
                                    type="phone"
                                    className="form-control"
                                    name="phone" 
                                    placeholder="Enter your phone" 
                                    value={this.state.phone.value} 
                                    onChange={ (event) => this.handleInputChange(event, this.validatePhone)} 
                                    onBlur={this.validatePhoneAvailability} 
                                    required /> 
                                </div>
                                <label className="col-md-6 col-form-label text-md-right">{this.state.phone.errorMsg}</label>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Password</label>
                                <div className="col-md-6">
                                <input 
                                    className="form-control"
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter your password" 
                                    value={this.state.password.value} 
                                    onChange={(event) => this.handleInputChange(event, this.validatePassword)} 
                                    required />
                                </div>
                                <label className="col-md-6 col-form-label text-md-right">{this.state.password.errorMsg}</label>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div className="col-md-6">
                                <input 
                                    type="password" 
                                    className="form-control"
                                    name="confirmPass" 
                                    placeholder="Confirm the password" 
                                    value={this.state.confirmPass.value} 
                                    onChange={(event) => this.handleInputChange(event, this.validateConfPasswordAbility)}
                                    required />
                                </div>
                                <label className="col-md-6 col-form-label text-md-right">{this.state.confirmPass.errorMsg}</label>
                            </div>

                            <div className="col-md-6 offset-md-4">
                                <button className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}


validateName=(name)=>{
    if(name !==''){
    if(name.length < 3) {
        return {
            validateStatus: true,
            errorMsg: `Name is too short (Minimum 3 characters needed.)`
        }
    } else if (name.length > 20) {
        return {
            validateStatus: true,
            errorMsg: `Name is too long (Maximum 20 characters allowed.)`
        }
    } else {
        return {
            validateStatus: false,
            errorMsg: null,
        };            
    }
}
}
validateAddress=(address)=>{
        if(address!==''){
            if(address < 10){
                return {
                    validateStatus: true,
                    errorMsg: `Address must be higher then 10 character`
                }
            }else if(address > 30){
                return {
                    validateStatus: true,
                    errorMsg: `Address is too long (Maximum 30 characters allowed.)`
                }
            }else {
                return {
                    validateStatus: false,
                    errorMsg: null
                }
            }
        }
}
validateCountry=(country)=>{
    if(country !==''){
        if(country.length < 3) {
            return {
                validateStatus: true,
                errorMsg: `Country is too short (Minimum 3 characters needed.)`
            }
        } else if (country.length > 20) {
            return {
                validateStatus: true,
                errorMsg: `Country is too long (Maximum 20 characters allowed.)`
            }
        } else {
            return {
                validateStatus: false,
                errorMsg: null,
            };            
        }
    }
}
validatePhone=(phone)=>{
    if(phone !==''){
        if (phone.length === 9) {
            return {
                validateStatus: false,
                errorMsg: null
            }
        } else {
            return {
                validateStatus: true,
                errorMsg: `Country is too long (Maximum 9 characters allowed.)`,
            };            
        }
    }
}

validatePhoneAvailability() {
        const cardNumbValue = this.state.phone.value;
        const usernameValidation = this.validatePhone(cardNumbValue);
        if(usernameValidation){
        if(usernameValidation.validateStatus === true) {
            this.setState({
                phone: {
                    value: cardNumbValue,
                    ...usernameValidation
                }
            });
            return;
        } else{
        checkPhone(cardNumbValue)
        .then(response => {
            if(response.data === 1) {
                this.setState({
                    phone: {
                        value: cardNumbValue,
                        validateStatus: false,
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    phone: {
                        value: cardNumbValue,
                        validateStatus: 'error',
                        errorMsg: 'this telephone is already taken'
                    }
                });
            }
        }).catch(error => {
            this.setState({
                phone: {
                    value: cardNumbValue,
                    validateStatus: 'error',
                    errorMsg: null
                }
            });
        });
        }

        
    }
}

validatePassword(password){
    if(password < 5){
        return{
            validateStatus: true,
            errorMsg: 'password must greter than 5 character'
        }
    }else{
        return{
            validateStatus: false,
            errorMsg: null
        }
    }
}

validateConfPasswordAbility(confPassword){
        if (confPassword === this.state.password.value){
            return{
                validateStatus: false,
                errorMsg: null
            }
        }else{
            return {
                validateStatus: true,
                errorMsg: 'this is not confirm'
            }
        }
}
}
export default SingUp;