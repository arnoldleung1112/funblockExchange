import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteTransaction } from '../../actions/transActions';
import {withRouter} from 'react-router-dom'
import config from '../../config/config'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class TransTable extends Component {


  onDeleteClick = (id)=>{
    
    this.props.deleteTransaction(id);
    this.props.history.push('/dashboard');
    
  }

  onNewRequestClick = ()=>{
    this.props.history.push('/request')
  }
  onNewPaxRequestClick = ()=>{
    this.props.history.push('/requestpax')
  }
  render() {
    const { trans } = this.props;

    console.log(trans)
    
    const tableContent = trans && trans.filter(trans => trans.transType == "GcToBlux").map(
      data => (
        <tr key={data._id}>
            <td>{data.amountRequested}</td>
            <td> {data.status}</td>
            <td> <Moment format="YYYY/MM/DD HH:mm">{data.requestTime}</Moment></td>
            <td>
              <a href="">details</a>
            </td>
        </tr>
      )
    )

    const paxTableContent = trans && trans.filter(trans => trans.transType == "BluxToPax").map(
      data => (
           <tr key={data._id}>
            <td>{data.amountRequested}</td>
            <td> {data.status}</td> 
  
            <td> <Moment format="YYYY/MM/DD HH:mm">{data.requestTime}</Moment></td>
    
            <td>
              
              <a href="">details</a>
            </td>
          </tr>)
    )
  

    return (
      <div>
        <div className="row m-2"> 
          <h4 className="col-md-12 text-center">Exchange Transactions Request </h4>
        </div>

        <div className="row text-center"> 
          <div  className="col-6">
            <button className="btn btn-primary " onClick={this.onNewRequestClick}> New BLUX Request </button> 
          </div>
          <div  className="col-6">   
            <button className="btn btn-secondary" onClick={this.onNewPaxRequestClick}> New PAX Request  </button> 
          </div>
        </div>

        <div className="row m-2"> 
          <h4 className="col-md-12 text-center m-2">Transactions History </h4>
        </div>

        <div className="row text-center">
            <Tabs>
            <TabList>
              <Tab>GC to BLUX</Tab>
              <Tab>TBLUX to PAX</Tab>
            </TabList>
            <TabPanel>
              <table className="table small">
                    <thead>
                        <tr>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Request Time</th>
                        {/* <th>Executed Time</th> */}
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
              </table>
            </TabPanel>
            <TabPanel>
              <table className="table small">
                    <thead>
                        <tr>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Request Time</th>
                        {/* <th>Executed Time</th> */}
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paxTableContent}
                    </tbody>
              </table>
            </TabPanel>
          </Tabs>
        </div>
    </div>
    )
  }
}

TransTable.propTypes = {
  deleteTransaction: PropTypes.func.isRequired
}

export default connect(null,{deleteTransaction})(withRouter(TransTable))