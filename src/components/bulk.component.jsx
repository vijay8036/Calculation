import React, { Component } from 'react';
import axios from 'axios';

export default class Bulk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{'name': "Vijay"},{'name': "Vijay-2"},{'name': "Vijay-3"}]
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    // componentDidMount(){
    //     axios.get('http://localhost:3001/university')
    //       .then(response => {
    //         this.setState({ users: response.data.universitys });
    //         console.log(response.data.users)
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       })
    //   }
    addClick(){
        this.setState(prevState => ({ 
            users: [...prevState.users, { 'name': ""}]
        }))
    }
    createUI() {
        return this.state.users.map((el, i) => (
            <div key={i}>
                <label>University Name {i+1}  </label>
                <div className="d-flex form-group">
                    <input placeholder={'University Name ' + (i+1)} type="text" name="name" value={el.name || ''} onChange={this.handleChange.bind(this, i)} className="form-control mr-3" />
                    <input type='button' className={this.state.users.length === 1 ? 'd-none' : 'btn btn-danger'} value='Remove' onClick={this.removeClick.bind(this, i)} />
                </div>
            </div>
        ))
    }
    handleChange(i, e) {
        const { name, value } = e.target;
        let users = [...this.state.users];
        users[i] = {...users[i], [name]: value};
        this.setState({ users });
    }
   removeClick(i){
        let users = [...this.state.users];
        users.splice(i, 1);
        this.setState({ users });
    }
 
  
    onSubmit(e) {
        e.preventDefault();      
        axios.post('http://192.168.4.35:3001/universityBulk', this.state.users)
              .then(res => console.log(res.data));
          
        this.setState({
            users: [{'name': ""}]      
        })
      }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add Multi University</h3>
                <form onSubmit={this.onSubmit}>
                    {this.createUI()}        
                    <input type='button' className="btn btn-secondary mr-2"  value='Add more' onClick={this.addClick.bind(this)}/>
                    <input type="submit" className="btn btn-primary"  value="Submit" />
                </form>
            </div>
        )
    }
}