import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser,faLock} from '@fortawesome/free-solid-svg-icons'
// import '../../node_modules/font-awesome/css/font-awesome.min.css'
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);  
        this.onChangeUsername = this.onChangeUsername.bind(this);  
        this.onChangePassword = this.onChangePassword.bind(this);  
        this.state = {         
            username: '',
            password:'',
            errorMessage:'',       
            redirectTo: null  
        };   
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
      }
      onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
      }
      onLogin(){
          console.log('username >> '+this.state.username + ' password >>>' +this.state.password)
          const obj = {
            name: this.state.username,
            password:this.state.password           
          };
          axios.post('http://localhost:3001/login',obj)
          .then(res => {               
            console.log(res)
            if(res.data.status !== 401){
                localStorage.setItem("token", res.data.token)
                this.setState({
                    errorMessage: res.data.msg,
                    redirectTo: '/dashboard'
                });
            }else{
                this.setState({
                    errorMessage: res.data.msg
                });
            }
            // this.setToken(res.data.token);
          })
          .catch(function (error) {
              console.log(error);
          })
      } 
    render() {   
        if (this.state.redirectTo) {
            return (<Redirect to={{ pathname: this.state.redirectTo }} />)
        }    
        return (   
            <aside className="col-sm-4 mx-auto">
                <div contenteditable="true"> Type here</div>
                <p>Login</p>        
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                        <hr />
                        <p className="text-danger text-center">{this.state.errorMessage}</p>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faUser} size="1x"/></span>
                                </div>
                                <input name="" value={this.state.username} onChange={this.onChangeUsername} className="form-control" placeholder="Email or login" type="email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faLock} size="1x"/> </span>
                                </div>
                                <input className="form-control" value={this.state.password} onChange={this.onChangePassword} placeholder="******" type="password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button onClick={this.onLogin} type="submit" className="btn btn-primary btn-block"> Login  </button>
                        </div>
                        <p className="text-center">Forgot password?</p>
                    </div>
                </div>        
            </aside>
       )
    }
}
