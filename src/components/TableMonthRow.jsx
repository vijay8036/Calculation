import React, { Component } from 'react';
// import axios from 'axios';
// import $ from "jquery";
import { withRouter } from 'react-router';

class TableRow extends Component {
    constructor(props) {
        super(props);    
        this.onStatusCheck = this.onStatusCheck.bind(this);  
        // this.onDelete = this.onDelete.bind(this);  
        // this.onEdit = this.onEdit.bind(this);  
     }
      // onEdit() {
      //   $('#addNewMonthModal').modal('show')       
      //   // console.log(this.state.isEdit)
      //   console.log(this.props.obj._id)
      // }
     
    //   onDelete() {
    //     axios.delete('http://192.168.4.35:3001/month/monthid'+this.props.obj._id)
    //     .then(json => {
    //         if(json.status===200){            
    //           this.props.history.push('/')              
    //         }
    //         else{             
    //           this.props.history.push('/index')
    //         }
    //       }).catch((error)=>{
    //         console.log("error-----------",error)
    //   })
      
    // }
    onStatusCheck(){  
      if (this.props.obj.status === 0) {
        return (<span className="badge badge-primary">Running</span>)
      }else{
        return (<span className="badge badge-success">Complated</span>)
      }
    }
  render() {
    return (
        <tr>
          <td>
          {this.props.index}  
          </td>                  
          <td>
            {this.props.obj.month +' ' + this.props.obj.year}
          </td>         
          <td>
          30 Days     
          </td>
          <td>
             {this.onStatusCheck()}  
          </td>
          <td>
          {/* <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary mr-2">Edit</Link>   */}
            <button onClick={this.props.onEdit} className="btn btn-primary mr-2">Edit</button>
            <button onClick={this.props.onDelete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
    
  }
}

export default withRouter (TableRow);