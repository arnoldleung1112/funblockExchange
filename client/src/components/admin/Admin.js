import React, { Component } from 'react'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'
import {getAllTransactions} from  '../../actions/transActions'
import {Link} from 'react-router-dom'
import config from '../../config/config'
import Moment from 'react-moment';

class Admin extends Component {

  componentDidMount(){
    this.props.getAllTransactions();
  }
  render() {
    const {transactions} = this.props.transaction
    const {user} = this.props.auth
    var tableRow = null;

    if (user.uid != "57"){
      return(
        <div className="strong">
          Sorry you do not have the permission to this page
        </div>
      )
    }

    if (transactions){
      tableRow = transactions.map(
        transaction => (
          <tr key={transaction._id}>
          <td>{transaction.user_uid}</td>
          <a target="_blank"  href={`${config.etherExplorer  + '/address/' +transaction.dst_address}`}>{transaction.dst_address}</a>
           <td> {transaction.status}</td>
           <td> <Moment format="YYYY/MM/DD HH:mm">{transaction.requestTime}</Moment></td>
           <td> <Moment format="YYYY/MM/DD HH:mm">{transaction.execTime}</Moment> </td>
           <td>{transaction.amountRequested}</td>
           <td>{transaction.amountTransferred}</td>
           
            <td>
              {transaction.status == "Pending" ? 
              (<Link to={`/updateTrans/${transaction._id}`} className="btn btn-primary">update</Link>):
              (<a href={`${config.etherExplorer + '/tx/'+transaction.transactionId}`} className="btn btn-primary">Transaction details</a>)}
                      
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
          <div className="table-wrapper">
            {/* table */}
              <table className="table">
                <thead>
                <tr>
                      <th>User</th>
                      <th>To Address</th>
                      <th>Status</th>
                      <th>Request Time</th>
                      <th>Executed Time</th>
                      <th>GC Amount Requested</th>
                      <th>BLUX Transferred </th>
                      
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
      </div>
    )
  }
}

Admin.propTypes={
  transaction: Proptypes.object.isRequired,
  getAllTransactions: Proptypes.func.isRequired
}

const mapStatetoProps = state => ({
  transaction: state.transaction,
  auth: state.auth
})

export default connect(mapStatetoProps,{getAllTransactions})(Admin)