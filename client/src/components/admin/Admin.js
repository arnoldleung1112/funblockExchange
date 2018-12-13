import React, { Component } from 'react'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'
import {getAllTransactions} from  '../../actions/transActions'
import {Link} from 'react-router-dom'
class Admin extends Component {

  componentDidMount(){
    this.props.getAllTransactions();
  }
  render() {
    const {transactions} = this.props.transaction
    
    var tableRow = null;

    if (transactions){
      tableRow = transactions.map(
        transaction => (
          <tr key={transaction._id}>
          <td>{transaction.user_uid}</td>
          <td>{transaction.dst_address}</td>
           <td> {transaction.status}</td>
           <td> {transaction.requestTime}</td>
           <td> {transaction.execTime} </td>
           <td>{transaction.amountRequested}</td>
           <td>{transaction.amountTransferred}</td>
           <td>{transaction.transactionId}</td>
            <td>
              <Link to={`/updateTrans/${transaction._id}`} className="btn btn-primary">update</Link>             
           </td>
        </tr>
        )
      )
    }
    
    

    return (
      <div className="admin">
        <div className="container">
          <div className="row">
            {/* title */}
            <div className="col-md-12">
              <h1>Admin Panel</h1>
              <p className="lead text-muted"> Welcome Admin</p>
            </div>
          {/* table */}
          <table className="table">
            <thead>
            <tr>
                  <th>User</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Request Time</th>
                  <th>Executed Time</th>
                  <th>GC Amount Requested</th>
                  <th>Block Transferred </th>
                  <th>Transcation Id</th>
                  <th>Action </th>
            </tr>
            </thead>
            <tbody>
              {tableRow}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    )
  }
}

Admin.propTypes={
  transaction: Proptypes.object.isRequired,
  getAllTransactions: Proptypes.func.isRequired
}

const mapStatetoProps = state => ({
  transaction: state.transaction
})

export default connect(mapStatetoProps,{getAllTransactions})(Admin)