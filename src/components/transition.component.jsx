import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from "jquery";
import Calculations from './cal'
export default class Transition extends Component{
    constructor(props) {
        super(props);
        this.tabRow = this.tabRow.bind(this);      
        this.getMemberData = this.getMemberData.bind(this);      
        this.getMonthData = this.getMonthData.bind(this);      
        this.selctOption = this.selctOption.bind(this);      
        this.onChangeMonth = this.onChangeMonth.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);  

        this.onChangenewWidthdrowal= this.onChangenewWidthdrowal.bind(this);
        this.onChangewidthdrowalCredit= this.onChangewidthdrowalCredit.bind(this);
        this.onChangeintrest= this.onChangeintrest.bind(this);
        this.onChangefine    = this.onChangefine.bind(this);
        this.getMemberWithdrowIntrest    = this.getMemberWithdrowIntrest.bind(this);
        this.getTotalwithdrowData    = this.getTotalwithdrowData.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
      
        this.state = {
            selectMonth:"",
            memberData: [],
            monthData: [],
            transitionData:[],
            membertransitiondata:[],

          
            currantInstallmentAmount:0,
            currantIntrast:0,
            currantWidthdrowalCredit:0,
            currantFine:0,
            currantNewWidthdrowal:0     
        };       
    }
    componentDidMount() {
       this.getMemberData();
       this.getMonthData();
       this.getTotalwithdrowData();      
    }   
    getTotalwithdrowData(){
        axios.get('http://localhost:3001/totalwithdrow')
        .then(json => {
            this.setState({
               membertransitiondata : json.data             
            }) 
        }).catch((error)=>{
            console.log(  "error-----------",error)    
        })  
    }
    getMemberData(){
        axios.get('http://localhost:3001/member')
            .then(response => {               
                this.setState({ memberData: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getMonthData(){
        axios.get('http://localhost:3001/monthstatus')
            .then(response => {               
                this.setState({ monthData: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeMonth(e){
        this.setState({
            selectMonth: e.target.value,           
        });     
       
        if(e.target.value ==="Select"){
           this.setState({
                transitionData:[],
                currantInstallmentAmount:0,
                currantIntrast:0,
                currantWidthdrowalCredit:0,
                currantFine:0,
                currantNewWidthdrowal:0     
            })
        }else{    
            if(this.state.transitionData.length === 0){               
                for (let i = 0; i < this.state.memberData.length; i++) {
                    this.state.transitionData.push({
                        "memberId": this.state.memberData[i]._id,
                        "monthId": e.target.value,
                        "installmentAmount":2000,
                        "newWidthdrowal":0,
                        "widthdrowalCredit": 0 ,
                        "intrest": this.getMemberWithdrowIntrest(this.state.membertransitiondata,"_id",this.state.memberData[i]._id) * 1 / 100,
                        "fine": 0,
                    });
                    this.setState({
                        currantInstallmentAmount: this.state.transitionData.reduce((totalInstallmentAmount, obj) => totalInstallmentAmount + obj.installmentAmount, 0),
                        currantIntrast: this.state.transitionData.reduce((totalIntrast, obj) => totalIntrast + obj.intrest, 0),
                       
                        
                    })
                }
             
           this.tabRow()  
             }  
           

        }
    }
    getMemberWithdrowIntrest(obj, key, val) {
        var objdata = obj.filter(x=> x._id === val)[0];
        if(objdata === undefined){
            return 0;
        }else{
            return objdata.memberwidthdrowal - objdata.memberwidthdrowalCredit
        }
    }
    tabRow(){
        // return this.state.memberData.map(function(object, i){           
        //     return <TableRow index={i + 1} obj={object} key={i} />;            
        // });
        if(this.state.transitionData.length === 0){
            var btnMonth;
            if(this.state.monthData.length === 0){
                btnMonth = <Link to={'/month'} className="btn btn-sm btn-success">Create Month</Link>;
            }
            return (<tr>
                <td colSpan="8"> 
                    <div className="alert alert-danger d-flex justify-content-between mb-0" role="alert">
                        <span>Please Select Month</span>
                         { btnMonth }      
                    </div>
                </td>
            </tr>)
        }else{
            return this.state.transitionData.map((obj, i)=>(            
                <tr  key={i}>
                <td>
                {i+1}            
                </td>                  
                <td style={{width:`30%`}}>
                {this.state.memberData[i].name.firstname +" "+this.state.memberData[i].name.lastname }<b> ({this.state.memberData[i].contectno})</b>
                </td>   
                <td>2000</td>      
                <td>{this.getMemberWithdrowIntrest(this.state.membertransitiondata,"_id",obj.memberId)}</td>
                <td>
                {obj.intrest}
                    {/* <div className="form-group">
                        <input type="number" placeholder="Intrest"  value={obj.intrest} onChange={this.onChangeintrest(i)} className="form-control" />
                    </div> */}
                </td>                
                <td>
                    <div className="form-group mb-0">
                        <input type="number" placeholder="Widthdrowal Credit" value={obj.widthdrowalCredit} onChange={this.onChangewidthdrowalCredit(i)} className="form-control form-control-sm" />
                    </div>
                </td>
                <td>
                    <div className="form-group mb-0">
                        <input type="number" placeholder="New Widthdrowal"  value={obj.newWidthdrowal} onChange={this.onChangenewWidthdrowal(i)}  className="form-control form-control-sm" id="txtlastname" />
                    </div>
                </td>            
                <td>
                    <div className="form-group mb-0">
                        <input type="number" placeholder="Fine"  value={obj.fine} onChange={this.onChangefine(i)} className="form-control form-control-sm" />
                    </div>
                </td>
            
            </tr>)
            );
        }
    }
    selctOption() {
        return this.state.monthData.map(function(object, i) {            
            return (<option value={object._id} key={i}>{object.month+" "+object.year } </option>)            
        })
    }
    addNewMember(){
        $('#addNewMemberModal').modal('show');      
    }
   
    onChangenewWidthdrowal = i => e => {       
        const transitionData = [...this.state.transitionData];
        const data = transitionData[i]       
        transitionData[i] = {            
                "memberId": data.memberId,
                "monthId": data.monthId,
                "installmentAmount":data.installmentAmount,
                "newWidthdrowal": parseInt(e.target.value)||0,
                "widthdrowalCredit":data.widthdrowalCredit,
                "intrest":data.intrest,
                "fine":data.fine,         
        };
        // const temp = e.target.value + this.state.currantNewWidthdrowal
        this.setState({
            transitionData
        });
        setTimeout(() => {
            this.setState({
                 currantNewWidthdrowal: this.state.transitionData.reduce((totalNewWidthdrowal, obj) => totalNewWidthdrowal + obj.newWidthdrowal, 0)                  
                });
          }, 100);
        
      };
    onChangewidthdrowalCredit = i => e => {       
        const transitionData = [...this.state.transitionData];
        const data = transitionData[i]       
        transitionData[i] = {            
                "memberId": data.memberId,
                "monthId": data.monthId,
                "installmentAmount":data.installmentAmount,
                "newWidthdrowal": data.newWidthdrowal,
                "widthdrowalCredit":parseInt(e.target.value)||0,
                "intrest":data.intrest,
                "fine":data.fine,         
        };
        this.setState({
            transitionData
        });
        setTimeout(() => {
            this.setState({
                currantWidthdrowalCredit: this.state.transitionData.reduce((totalWidthdrowalCredit, obj) => totalWidthdrowalCredit + obj.widthdrowalCredit, 0),
            });
          }, 100);
      };
    onChangeintrest = i => e => {       
        const transitionData = [...this.state.transitionData];
        const data = transitionData[i]      
        transitionData[i] = {            
                "memberId": data.memberId,
                "monthId": data.monthId,
                "installmentAmount":data.installmentAmount,
                "newWidthdrowal": data.newWidthdrowal,
                "widthdrowalCredit":data.widthdrowalCredit,
                "intrest":parseInt(e.target.value)||0,
                "fine":data.fine,         
        };
        this.setState({
            transitionData
        });
      };
    onChangefine = i => e => {       
        const transitionData = [...this.state.transitionData];
        const data = transitionData[i]     
        transitionData[i] = {            
                "memberId": data.memberId,
                "monthId": data.monthId,
                "installmentAmount":data.installmentAmount,
                "newWidthdrowal": data.newWidthdrowal,
                "widthdrowalCredit":data.widthdrowalCredit,
                "intrest":data.intrest,
                "fine":parseInt(e.target.value)|| 0,         
        };
        this.setState({
            transitionData,
        });
        setTimeout(() => {
            this.setState({
                currantFine: this.state.transitionData.reduce((totalFine, obj) => totalFine + obj.fine, 0)
            });
          }, 100);
      };

    onSubmit() {
        axios.post('http://localhost:3001/transition', this.state.transitionData)
            .then(res => {
                this.setState({
                    transitionData: [],
                    currantInstallmentAmount:0,
                    currantIntrast:0,
                    currantWidthdrowalCredit:0,
                    currantFine:0,
                    currantNewWidthdrowal:0  
                })
                this.getMonthData();
            });
        const obj = {
            status: 1
        };
        axios.put('http://localhost:3001/monthstatus/' + this.state.selectMonth, obj)
            .then(json => {
                console.log(json, 'response on edit request!!!!!');
            }).catch((error) => {
                console.log("error-----------", error)
            })
    }

    render(){
        return(
            <div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                    <h4 className="mr-3">Select Transition Month</h4>
                        <div className="form-group">
                            <select value={this.state.selectMonth} onChange={this.onChangeMonth}  className="form-control">
                                <option defaultValue>Select</option>
                                {this.selctOption()}
                            </select>
                        </div>                                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <table className="table table-striped  table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name <br></br>(Contect NO) </th>
                                    <th>Installment</th>
                                    <th>Previus Widthdrowal</th>
                                    <th>Intrest</th>
                                    <th>Widthdrowal Credit</th>
                                    <th>New Widthdrowal</th>
                                    <th>Fine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tabRow()}
                            </tbody>
                        </table>               
                    </div>
                    <div className="col-md-3">                        
                        <Calculations onSubmit={() => this.onSubmit()} currantWidthdrowalCredit={this.state.currantWidthdrowalCredit} currantFine={this.state.currantFine} currantNewWidthdrowal={this.state.currantNewWidthdrowal}  currantIntrast={this.state.currantIntrast} currantInstallmentAmount={this.state.currantInstallmentAmount}></Calculations>    
                        {/*   */}
                    </div>
                </div>
               
        </div>
        )
    }
}


