import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'
import axios from 'axios';
export default class Index extends Component {
    constructor() {
        super();       
        this.state = { 
            data: "",
            redirectTo: null  
        };   
    }
    componentDidMount(){
       
       if(localStorage.getItem('token')){
     
        // console.log(obj)
        axios.get('http://localhost:3001/logindata/'+localStorage.getItem('token'))
          .then(response => {                  
              this.setState({
                data: response.data 
            }); 
            console.log(response.data.name)               
            console.log(this.state.data.name)               
          })
          .catch(function (error) {
            console.log(error);
          })
        }else{
            this.setState({               
                redirectTo: '/login'
            });
        }
      }
   
    render() {  
        if (this.props.user) {
            return (<Redirect to={{ pathname: this.state.redirectTo }} />)
        }        
        return (
            <div>           
    <h3 align="center">{this.state.data.name}</h3>
            </div>
        )
    }
}
