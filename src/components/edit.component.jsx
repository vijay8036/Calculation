import React, { Component } from 'react';
import axios from 'axios';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeUniversityName = this.onChangeUniversityName.bind(this);
        // this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        // this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       
        this.state = {
            university_name: '',          
        }
    }
    componentDidMount() {
        console.log(this.props.match.params)
        axios.get('http://192.168.4.35:3001/university/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    university_name: response.data.name,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeUniversityName(e) {
        this.setState({
            university_name: e.target.value
        });
      }
    
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.university_name
        };
        axios.post('http://192.168.4.35:3001/updateuniversity/' + this.props.match.params.id, obj)
        .then(json => {
            console.log(json,'response on edit request!!!!!');
            
            if(json.status===200){ 
                console.log("in ")             
                this.props.history.push('/index')
            }
            else{              
              this.props.history.push('/index')
            }
          }).catch((error)=>{
            console.log("error-----------",error)
          })
        
        // this.props.history.push('/index');
    }
   
  
    render() {
        return (
            <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>University name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.university_name}
                      onChange={this.onChangeUniversityName}
                      />
                </div>               
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
          
        </div>
        
        )
    }
}