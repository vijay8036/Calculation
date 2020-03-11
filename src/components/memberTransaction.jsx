import React, { Component } from 'react';
import axios from 'axios';
// import $ from "jquery";
// import { withRouter } from 'react-router';

export default  class  MemberTransaction extends Component {
    constructor(props) {
        super(props);  
        this.tabRow = this.tabRow.bind(this);  
        this.state = {         
          memberData: []          
        };
     }  
     componentDidMount() {       
        this.getData()
      } 
     getData(){
       axios.get('http://localhost:3001/membertransition/'+this.props.match.params.id)
        .then(response => {               
            this.setState({ memberData: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }

     tabRow(){
      var amoutCount = 0;
      var IamoutCount = 0;
      var FamoutCount = 0;
      var InamoutCount = 0;
      var WcamoutCount = 0;
      var nwamoutCount = 0;
      return this.state.memberData.map((object, i)=>{  
          
          if(object.installmentAmount){
            IamoutCount = amoutCount + object.installmentAmount
            amoutCount += object.installmentAmount
          }
        
          if(object.newWidthdrowal){
            nwamoutCount = amoutCount - object.newWidthdrowal
            amoutCount -= object.newWidthdrowal
          }
          if(object.widthdrowalCredit){
            WcamoutCount = amoutCount + object.widthdrowalCredit
            amoutCount += object.widthdrowalCredit
          }
          if(object.fine){
            FamoutCount = amoutCount + object.fine
            amoutCount += object.fine
          }
          if(object.intrest){
            InamoutCount = amoutCount + object.intrest
            amoutCount += object.intrest
          }
          
          return <TableRow obj={object} key={i} 
            AmoutCount={amoutCount}
            IamoutCount={IamoutCount}
            FamoutCount={FamoutCount}
            InamoutCount={InamoutCount}
            WcamoutCount={WcamoutCount}
            nwamoutCount={nwamoutCount}
            />;
      });             
            
          // return <TableRow/>;
                
  }
    
  render() {
    
    var Membername  
    if(this.state.memberData.length !== 0){
      Membername = this.state.memberData[0].memberId.name.firstname +" "+this.state.memberData[0].memberId.name.lastname+" "+'('+this.state.memberData[0].memberId.contectno+')'
    }
    return (
      <div className="row">
          <div className="col-xs-10 col-sm-10 col-md-7 mx-auto">            
               <div className="h3 text-center mb-4">
                {Membername}
                </div>     

                <table className="table table-bordered table-hover  table-striped reporttable">
                    <thead>                        
                        <tr>
                          <th style={{width:`150px`}}>Date</th>
                          <th  style={{width: `55%`}}>Details</th>
                          <th className="text-center" style={{width: `15%`}}>Credit/<br></br>Dabit</th>
                          <th className="text-center" style={{width: `15%`}}>Remain Amount</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {this.tabRow()}                    
                    </tbody>
                </table>             
            
           </div>
       </div>
    )
    
  }
}

export class TableRow extends Component{
  constructor(props) {
      super(props);    
      this.tabRow = this.tabRow.bind(this);
   }
   tabRow(){
    var created_date = new Date(this.props.obj.createdAt);

    var year = created_date.getFullYear();
    var month = created_date.getMonth();
    var date = created_date.getDate();
    var DateCreate = date + '/' + month + '/' + year   // final date with time, you can use this according your requirement
    
    //  console.log(time)
     var memberTransectionArrey =[]
     var i = 0
        if(this.props.obj.installmentAmount !== 0){
          i += 1
          memberTransectionArrey.push(
            <tr key={i}>
              <td style={{width:`150px`}}>{DateCreate}</td>
              <td >Installment Amount</td>
              <td className="text-right text-success">{this.props.obj.installmentAmount.toLocaleString()}/- <i className="small">Cr</i></td>
              <td className="text-right">{this.props.IamoutCount.toLocaleString()}/-</td>
            </tr>
          )
        }
        if(this.props.obj.fine !== 0){
          i += 1
          memberTransectionArrey.push(
            <tr key={i}>
              <td style={{width:`150px`}}>{DateCreate}</td>
              <td >Fine</td>
              <td className="text-right text-success">{this.props.obj.fine.toLocaleString()}/- <i className="small">Cr</i></td>
              <td className="text-right">{this.props.FamoutCount.toLocaleString()}/-</td>
            </tr>
          )
        }
        if(this.props.obj.intrest !== 0){
          i += 1
          memberTransectionArrey.push(
            <tr key={i}>
              <td style={{width:`150px`}}>{DateCreate}</td>
              <td >Intrest</td>
              <td className="text-right text-success">{this.props.obj.intrest.toLocaleString()}/- <i className="small">Cr</i></td>
              <td className="text-right">{this.props.InamoutCount.toLocaleString()}/-</td>
            </tr>
          )
        }
        if(this.props.obj.widthdrowalCredit !== 0){
          i += 1
          memberTransectionArrey.push(
            <tr key={i}>
              <td style={{width:`150px`}}>{DateCreate}</td>
              <td >Widthdrowal Credit</td>
              <td className="text-right text-success">{this.props.obj.widthdrowalCredit.toLocaleString()}/- <i className="small">Cr</i></td>
              <td className="text-right">{this.props.WcamoutCount.toLocaleString()}/-</td>
            </tr>
          )
        }
        if(this.props.obj.newWidthdrowal !== 0){
          i += 1
          memberTransectionArrey.push(
            <tr key={i}>
              <td>{DateCreate}</td>
              <td >New Widthdrowal</td>
              <td className="text-right text-danger">{this.props.obj.newWidthdrowal.toLocaleString()}/- <i className="small">Dr</i></td>
              <td className="text-right ">{this.props.nwamoutCount.toLocaleString()}/-</td>
            </tr>
          )
        }
      
      return memberTransectionArrey 
       
      
      
   }
  render(){
      return (
        this.tabRow()
      )
  }
}