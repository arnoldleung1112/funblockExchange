import React, { Component } from 'react'
import {connect} from 'react-redux'
import Proptypes from 'prop-types'
import {getAllTransactions} from  '../../actions/transActions'
import {Link} from 'react-router-dom'
import config from '../../config/config'
import Moment from 'react-moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AdminTable from './AdminTable'

class Admin extends Component {

  componentDidMount(){
    this.props.getAllTransactions();
  }
  render() {
    const {transactions} = this.props.transaction
    const {user} = this.props.auth


    if (user.uid != "57"){
      return(
        <div className="strong">
          Sorry you do not have the permission to this page
        </div>
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
          </div>
          <div className="row">  
                 <div className="col-md-12 card gcGreen">           
                        <h4>Pending (GC to BLUX): </h4>
                        <h2 className="strong">
                         {transactions && transactions.filter( tran => (tran.status == 'Pending' && tran.transType == 'GcToBlux')).length}
                        </h2>
                        <h4>Pending (BLUX to PAX): </h4>
                        <h2 className="strong">
                          {transactions && transactions.filter( tran => (tran.status == 'Pending' && tran.transType == 'BluxToPax')).length}
                        </h2>
                        <h4>Completed: </h4>
                        <h2 className="strong">
                          {transactions && transactions.filter( tran => (tran.status == 'Completed')).length}
                        </h2>
                </div>
            </div>
          <div className="row text-center">
            <Tabs>
              <TabList>
                <Tab> Pending (GC to BLUX)</Tab>
                <Tab> Pending (BLUX to PAX)</Tab>
                <Tab> Completed</Tab>
              </TabList>
               <TabPanel>
                 <AdminTable trans={transactions && transactions.filter( tran => (tran.status == 'Pending' && tran.transType == 'GcToBlux'))} />
              </TabPanel>
              <TabPanel>
                <AdminTable trans={transactions && transactions.filter( tran => (tran.status == 'Pending' && tran.transType == 'BluxToPax'))} />
              </TabPanel>
              <TabPanel>
                <AdminTable trans={transactions && transactions.filter( tran => (tran.status == 'Completed'))} />
              </TabPanel>
            </Tabs>       
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