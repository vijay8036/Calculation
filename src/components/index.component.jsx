import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
// import { constants } from 'crypto';


export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {universitys: []};
        this.onDelete = this.onDelete.bind(this);
  
       
    }
    componentDidMount(){
        axios.get('http://localhost:3001/university')
          .then(response => {
            this.setState({ universitys: response.data.universitys });
            console.log(response.data.universitys)
          })
          .catch(function (error) {
            console.log(error);
          })
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
    tabRow(){       
        return this.state.universitys.map(function(object, i){           
            return <TableRow obj={object} key={i} />;
        });
  }
    render() {       
        return (
            <div>           
                <h3 align="center">Business List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Person</th>                          
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
                <div className="modal fade" id="deleteModal" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          
                            <div className="modal-body">
                                <p className="text-danger"> Are you sure you want to delete record !</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={this.onDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
