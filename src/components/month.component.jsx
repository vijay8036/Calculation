import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableMonthRow';
import $ from "jquery";
export default class Month extends Component {
    constructor(props) {
        super(props);
        this.onChangeMonthName = this.onChangeMonthName.bind(this);
        this.onChangeYearName = this.onChangeYearName.bind(this);
        this.onStatusCheck = this.onStatusCheck.bind(this);          
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);  
        this.onEdit = this.onEdit.bind(this);  
        this.addNewMonth = this.addNewMonth.bind(this);  
        this.yearList = this.yearList.bind(this);
        this.tabRow = this.tabRow.bind(this);
        this.state = {
            month_name: '',
            year_name: '',
            isEdit:'',
            editedId:'',
            monthdata: []
        }
        
       
    }
   
    onChangeMonthName(e) {        
        this.setState({
            month_name: e.target.value
        });
    }
    onChangeYearName(e) {
        this.setState({
            year_name: e.target.value
        });
    }   
    componentDidMount() {
        this.setState({
            isEdit: false
        });
        axios.get('http://localhost:3001/month')
            .then(response => {               
                this.setState({ monthdata: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        // console.log("submit")
        const obj = {
            month: this.state.month_name,
            year: this.state.year_name,
            status: 0
        };      
       if(this.state.isEdit === true){
            console.log("true");
            this.setState({
                isEdit: false
            });           
            axios.post('http://localhost:3001/month/' + this.state.editedId, obj)
            .then(json => {
                console.log(json,'response on edit request!!!!!');                
                if(json.status===200){                              
                    this.componentDidMount();
                }
                else{              
                    console.log("not Updated ")
                }
            }).catch((error)=>{
                console.log("error-----------",error)
            })  
       }else{
            axios.post('http://localhost:3001/month', obj)
            .then(res => {
                
                if(!res.data.upserted){
                    alert("Month is Already Exists")
                }else{
                    this.componentDidMount();
                    $('#addNewMonthModal').modal('hide')
                    this.setState({
                        month_name: '',
                        year_name: ''
                    })
                }              
            });
            // console.log(this.state.month_name)
            
       }
        
    }
    onDelete(objId){        
        axios.delete('http://192.168.4.35:3001/month/'+objId)
        .then(json => {
            this.componentDidMount();
          }).catch((error)=>{
            console.log("error-----------",error)
      })
    }
    yearList() {
        let option = []
        for (let i = 0; i < 5; i++) {
            option.push(<option key={i}>{new Date().getFullYear() + i}</option>)
        }
        return option;
    }
   
    onStatusCheck(item){
        if (item.status === 0) {
          return (<span className="badge badge-primary">Running</span>)
        }else{
          return (<span className="badge badge-success">Complated</span>)
        }
      }
      
      onEdit(obj) {
        $('#addNewMonthModal').modal('show') 
        this.setState({
            isEdit: true,
            editedId:obj._id,
            month_name: obj.month,
            year_name: obj.year,
        });  
        
      }
        tabRow() {

            return this.state.monthdata.map((object, i) => {
                return <TableRow onEdit={() => this.onEdit(object)} onDelete={() => this.onDelete(object._id)} index={i + 1} key={i} obj={object} />
            })

        }
        addNewMonth(){
            $('#addNewMonthModal').modal('show') ;
                this.setState({
                    isEdit: false,
                    month_name: '',
                    year_name: '',
                });  
        }
    render() {
        return (
            <div style={{ marginTop: 10 }}>                 
                <h4 className="d-flex justify-content-between">List of Month <button className="btn btn-primary" onClick={this.addNewMonth} data-toggle="modal" data-target="#addNewMonthModal">Create New</button></h4>

                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Month</th>
                            <th>Duration (Days)</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                   <tbody>
                        {this.tabRow()}
                   </tbody>
                    {/* <tbody id="cursorPointer">                      
                        {this.state.monthdata.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}
                                </td>
                                <td>
                                    {item.month + ' ' + item.year}
                                </td>
                                <td> 30 Days </td>
                                <td>
                                    {this.onStatusCheck(item)}
                                </td>
                                <td>
                                    <button type="button" onClick={() => this.onEdit(item)} className="btn btn-primary mr-2">Edit</button>
                                    <button type="button" onClick={() => this.onDelete(item)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>*/}
                </table>

                <div className="modal fade" id="addNewMonthModal" role="dialog" aria-labelledby="addNewMonthModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <form onSubmit={this.onSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="monthName">Select Month</label>
                                        <select value={this.state.month_name} onChange={this.onChangeMonthName} className="form-control" id="monthName">
                                            <option defaultValue>Select</option>
                                            <option>January</option>
                                            <option>February</option>
                                            <option>March</option>
                                            <option>April</option>
                                            <option>May</option>
                                            <option>June</option>
                                            <option>July</option>
                                            <option>August</option>
                                            <option>September</option>
                                            <option>October</option>
                                            <option>November</option>
                                            <option>December</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yearName">Select Year</label>
                                        <select value={this.state.year_name} onChange={this.onChangeYearName} className="form-control" id="yearName">
                                            <option defaultValue>Select</option>
                                            {this.yearList()}
                                        </select>
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