import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
import { deleteTransaction } from '../../actions/transActions';
import {withRouter} from 'react-router-dom'

class TransTable extends Component {


  onDeleteClick = (id)=>{
    
    this.props.deleteTransaction(id);
    this.props.history.push('/dashboard');
    
  }

  onNewRequestClick = ()=>{
    this.props.history.push('/request')
  }
  render() {

    const { trans } = this.props;

    console.log(trans)
    
    const tableContent = trans && trans.map(
      data => (
        <tr key={data._id}>
            <td>{data.amountRequested}</td>
            <td>10900</td>
            <td> {data.status}</td>
            <td> {data.requestTime}</td>
            <td>{data.execTime}</td>
            <td>
              {data.status === "Pending" ? 
              (<button onClick={ ()=>{this.onDeleteClick(data._id)}}className="btn btn-danger">
                Cancel Request
              </button>)
              :
              (<button className="btn btn-primary">
                  Link to transaction details
                </button>
              )
              }
            </td>
        </tr>
      )
    )

    return (
      <div>
                    <h4 className=" col-md-12 m-2">Game Coin Transactions Request  <button className="btn btn-primary" onClick={this.onNewRequestClick}> New Request </button> </h4>
                    <table className="table">
                    <thead>
                        <tr>
                        <th>change</th>
                        <th>Balance</th>
                        <th>Status</th>
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
    )
  }
}

TransTable.propTypes = {
  deleteTransaction: PropTypes.func.isRequired
}

export default connect(null,{deleteTransaction})(withRouter(TransTable))