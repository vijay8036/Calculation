import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
  
      }
      onDelete() {
        axios.delete('http://192.168.4.35:3001/university/'+this.props.obj._id)
        .then(json => {
            if(json.status===200){            
              this.props.history.push('/index')              
            }
            else{             
              this.props.history.push('/index')
            }
          }).catch((error)=>{
            console.log("error-----------",error)
          })
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>         
          <td>
          <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>          
          </td>
          <td>
            <button onClick={this.onDelete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
    
  }
}

export default withRouter (TableRow);