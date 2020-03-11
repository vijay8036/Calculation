import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
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
          axios.post('http://192.168.4.35:3001/university', obj)
              .then(res => console.log(res.data));
          
        this.setState({
            university_name: ''         
        })
      }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New University</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>University Name  </label>
                        <input type="text" value={this.state.university_name}
                            onChange={this.onChangeUniversityName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register University" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}