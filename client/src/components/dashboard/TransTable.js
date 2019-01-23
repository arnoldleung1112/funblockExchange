import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteTransaction } from '../../actions/transActions';
import {withRouter} from 'react-router-dom'
import config from '../../config/config'



class TransTable extends Component {


  onDeleteClick = (id)=>{
    
    this.props.deleteTransaction(id);
    this.props.history.push('/dashboard');
    
  }

  onNewRequestClick = ()=>{
    this.props.history.push('/request')
  }
  render() {
    console.log(config)

    const { trans } = this.props;

    console.log(trans)
    
    const tableContent = trans && trans.map(
      data => (
        <tr key={data._id}>
            <td>{data.amountRequested}</td>
            <td> {data.status}</td>
            <td>
              <a target="_blank" href={`${config.etherExplorer  + '/address/' +data.dst_address}`}>{data.dst_address}</a>
            </td>
            <td>{data.amountTransferred}</td>
            <td> <Moment format="YYYY/MM/DD HH:mm">{data.requestTime}</Moment></td>
            <td><Moment format="YYYY/MM/DD HH:mm">{data.execTime}</Moment></td>
            <td>
              {data.status === "Pending" ? 
              (<button onClick={ ()=>{this.onDeleteClick(data._id)}}className="btn btn-danger">
                Cancel Request
              </button>)
              :
              (<a href={`${config.etherExplorer  + '/tx/' +data.transactionId}`} 
                className="btn btn-primary">Transaction details
              </a>)
              
              }
            </td>
        </tr>
      )
    )

    return (
      <div>
          <h4 className=" col-md-12 m-2">Game Coin Transactions Request  <button className="btn btn-primary" onClick={this.onNewRequestClick}> New Request </button> </h4>
          <div className="table-wrapper">
            <table className="table">
                    <thead>
                        <tr>
                        <th>Amount requested</th>
                        <th>Status</th>
                        <th> To address</th>
                        <th>BLUX transferred</th>
                        <th>Request Time</th>
                        <th>Executed Time</th>
                        <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                        
                    </tbody>
              </table>
          </div>
                    
    </div>
    )
  }
}

TransTable.propTypes = {
  deleteTransaction: PropTypes.func.isRequired
}

export default connect(null,{deleteTransaction})(withRouter(TransTable))