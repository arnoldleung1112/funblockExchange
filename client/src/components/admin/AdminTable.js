import React from 'react'
import {Link} from 'react-router-dom'
import config from '../../config/config'
import Moment from 'react-moment';

function AdminTable(props) {

    const tableRow = props.trans && props.trans.map(
        transaction => (
          <tr key={transaction._id}>
          <td>{transaction.user_uid}</td>
            <td>{transaction.dst_address}</td>
           <td> {transaction.status}</td>
           <td> <Moment format="YYYY/MM/DD HH:mm">{transaction.requestTime}</Moment></td>
           <td> <Moment format="YYYY/MM/DD HH:mm">{transaction.execTime}</Moment> </td>
           <td>{transaction.transType}</td>
           <td>{transaction.amountRequested}</td>
           <td>{transaction.amountTransferred}</td>
           
            <td>
              {transaction.status == "Pending" ? 
              (<Link to={`/updateTrans/${transaction._id}`} className="btn btn-primary">update</Link>):
              (<a href={`${'/transactionDetail/'+transaction._id}`}> details</a>)}
                      
           </td>
        </tr>
        )
    )

    
    return (
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
                        <th>Type </th>
                        <th>Amount Requested</th>
                        <th>Amount Transferred </th>
                        <th>Action </th>
                  </tr>
                  </thead>
                  <tbody>
                    {tableRow}
                  </tbody>
                </table>
            </div>
    )
}

export default AdminTable;
