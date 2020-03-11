import React, { Component } from 'react';
import axios from 'axios';

export default class Calculations extends Component{
    constructor(props) {
        super(props);
        this.getTotalTransition    = this.getTotalTransition.bind(this);
      
        this.state = {
            TotalTransition:0
        }

    }
    componentDidMount() {
        this.getTotalTransition()
    }
    getTotalTransition(){
        axios.get('http://localhost:3001/totaltransitionsum')
            .then(response => {              
                this.setState({ 
                    TotalTransition:
                    + response.data[0].totalinstallmentAmount
                    + response.data[0].totalwidthdrowalCredit
                    + response.data[0].totalintrest
                    + response.data[0].totalfine
                    - response.data[0].totalwidthdrowal
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render(){
        var currantInstallmentAmount
        if(this.props.currantInstallmentAmount !== 0){
            currantInstallmentAmount = <button onClick={this.props.onSubmit}  className="btn btn-block btn-primary mr-2">Submit</button>
        }
        return(
            
            <div className="card" >
                <div className="card-header">
                  <h6 className="card-title mb-0">Current Monthly Calculations</h6>
                </div>
             <div className="card-body">
                <div className="border-bottom d-flex justify-content-between">
                    <label>Total Installment :</label><span className="font-weight-bold text-info">{this.props.currantInstallmentAmount.toLocaleString()}/-</span>
                </div>
                <div className="border-bottom d-flex justify-content-between pt-2">
                <label>Total Intrest :</label><span className="font-weight-bold text-info">{this.props.currantIntrast.toLocaleString()}/-</span>
                </div>
                <div className="border-bottom d-flex justify-content-between pt-2">
                    <label>Total Fine :</label><span className="font-weight-bold text-info">{this.props.currantFine.toLocaleString()}/-</span>
                </div>
                <div className="border-bottom d-flex justify-content-between pt-2">
                    <label> Deposit the Previous <br></br> withdrawal :</label><span className="font-weight-bold text-info">{this.props.currantWidthdrowalCredit.toLocaleString()}/-</span>
                </div>
                <div className="border-bottom d-flex justify-content-between pt-2">
                    <label> Previous Balance :</label><span className="font-weight-bold text-info">{ this.state.TotalTransition.toLocaleString()}/-</span>
                    
                </div>
                <div className="d-flex justify-content-between pt-2">
                    <label> New withdrawal :</label><span className="font-weight-bold text-danger">{this.props.currantNewWidthdrowal.toLocaleString()}/-</span>
                </div>
            </div>          
           
            <div className="card-footer">
                <div className="text-center font-weight-bold mb-3">
                    <div> Total Current Balance</div>
                    <span className="text-success h4">
                        {
                            (this.props.currantInstallmentAmount
                            + this.props.currantIntrast
                            + this.props.currantFine
                            + this.props.currantWidthdrowalCredit
                            + this.state.TotalTransition
                            - this.props.currantNewWidthdrowal).toLocaleString()
                        }/-
                    </span>
                </div>
                
                <div className="text-center">
                    { currantInstallmentAmount } 
                </div>
            </div>
         
          </div>
        )
    }
}
