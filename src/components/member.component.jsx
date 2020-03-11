import React, { Component } from 'react';
import axios from 'axios';
import $ from "jquery";
import { Link } from 'react-router-dom';

export default class Member extends Component{
    constructor(props) {
        super(props);
       
        this.getData = this.getData.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeContectNo = this.onChangeContectNo.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);
        this.tabRow = this.tabRow.bind(this);
        this.addNewMember = this.addNewMember.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            first_name:'',
            last_name:'',
            contect_no:'',
            memberData: [],
            isEdit:'',
        };
        
    }
    componentDidMount() {       
      this.getData()
    }   

    getData(){
        axios.get('http://localhost:3001/member')
        .then(response => {               
            this.setState({ memberData: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }
   
    onChangeFirstName(e){
        this.setState({
            first_name: e.target.value
        })
    }
    onChangeLastName(e){
        this.setState({
            last_name: e.target.value
        });
    }
    onChangeContectNo(e){
        this.setState({
            contect_no: e.target.value
        });
    }
    addNewMember(){
        $('#addNewMemberModal').modal('show');    
        this.setState({
            isEdit: false,
            first_name:"",
            last_name:"",
            contect_no:""
        });    
    }
    onSubmit(e) {
        e.preventDefault();
        // console.log("submit")
        const obj = {            
            name:{
                firstname:this.state.first_name,
                lastname:this.state.last_name
           },
            contectno:this.state.contect_no,
            status: 0
        };              
        if(this.state.isEdit === true){
            console.log("true");
            this.setState({
                isEdit: false
            });           
            axios.post('http://localhost:3001/member/' + this.state.editedId, obj)
            .then(json => {
                console.log(json,'response on edit request!!!!!');                
                if(json.status===200){                              
                    this.getData();
                }
                else{              
                    console.log("not Updated ")
                }
            }).catch((error)=>{
                console.log("error-----------",error)
            })  
       }else{
            axios.post('http://localhost:3001/member', obj)
            .then(res => {
                this.getData();                
                this.setState({
                    first_name:"",
                    last_name:"",
                    contect_no:""
                })
            });
        }
        $('#addNewMemberModal').modal('hide')
    }

    tabRow(){
        return this.state.memberData.map((object, i)=>{           
            return <TableRow onEdit={() => this.onEdit(object)} onDelete={() => this.onDelete(object._id)} index={i + 1} obj={object} key={i} />;
        });             
    }

    onEdit(obj) {
        $('#addNewMemberModal').modal('show') 
        this.setState({
            isEdit: true,
            editedId:obj._id,
            first_name:obj.name.firstname,
            last_name:obj.name.lastname,
            contect_no:obj.contectno
        });  
      }
      onDelete(objId){        
        axios.delete('http://192.168.4.35:3001/member/'+objId)
        .then(json => {
            this.getData();
          }).catch((error)=>{
            console.log("error-----------",error)
      })
    }
    
   
 
    render(){
        return(
            <div>
                <h4 className="d-flex justify-content-between">List of Member <button className="btn btn-primary" onClick={this.addNewMember} data-toggle="modal" data-target="#addNewMonthModal">Create New Member</button></h4>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Contect No</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                <tbody>
                       {this.tabRow()}
                </tbody>                   
                </table>
               
                <div className="modal fade" id="addNewMemberModal" role="dialog" aria-labelledby="addNewMemberModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="mb-0">Create New Member Details</h6>
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="txtfirstname">First Name</label>
                                                <input type="text" name="firstname" placeholder="First Name"  value={this.state.first_name} onChange={this.onChangeFirstName} className="form-control" id="txtfirstname" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="txtlastname">Last Name</label>
                                                <input type="text" value={this.state.last_name} onChange={this.onChangeLastName} placeholder="Last Name" className="form-control" id="txtlastname" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="txtcontectno">Contect No</label>
                                        <input type="number" value={this.state.contect_no} onChange={this.onChangeContectNo} placeholder="Contect No" className="form-control" id="txtcontectno" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
         </div>
        )
    }
}

export class TableRow extends Component{
    constructor(props) {
        super(props);    
        this.onStatusCheck = this.onStatusCheck.bind(this);        
     }
     onStatusCheck(){
        if (this.props.obj.status === 0) {
            return (<span className="badge badge-success">Active</span>)
          }else{
            return (<span className="badge badge-danger">Block</span>)
          }
     }
    render(){
        return (
            <tr>
            <td>
            {this.props.index}  
            </td>                  
            <td>
              {this.props.obj.name.firstname +' ' + this.props.obj.name.lastname}
            </td>         
            <td>
            {this.props.obj.contectno}     
            </td>
            <td>
               {this.onStatusCheck()}  
            </td>
            <td>            
              <button onClick={this.props.onEdit} className="btn btn-primary mr-2">Edit</button>
              <button onClick={this.props.onDelete} className="btn btn-danger mr-2">Delete</button>
              {/* <link className="btn btn-info"></link> */}
              <Link to={'/mtransition/'+this.props.obj._id} className="btn btn-info">View Transaction</Link>
            </td>
          </tr>
      
        )
    }
}