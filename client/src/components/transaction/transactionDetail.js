import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {getTransaction, updateTrans} from '../../actions/transActions'
import TextFieldGroup from '../common/TextFieldGroup'
import axios from 'axios'

class transactionDetail extends Component {

constructor(){
  super();
  this.state={
  status:"",
  amountTransferred:null,
  execTime:null,
  transferred:null,
  dst_address:null,
  errors:{}
  }

}
  onSubmit = (e)=>{
    e.preventDefault();
    if (isNaN(this.state.amountTransferred)){
      this.setState(
        {errors: {amountTransferred: 'amount transferring is invalid'}}
      )
    }else{
      const data = {
        status:"Completed",
        amountTransferred:this.state.amountTransferred,
        execTime:Date.now(),
        dst_address: this.state.dst_address
      }
      axios.patch(`/api/transactions/${this.props.match.params.trans_Id}`,data)
      .then( res => this.props.history.push('/admin'))
    }
    
  }

componentDidMount() {
        this.props.getTransaction(this.props.match.params.trans_Id);
        const transaction = this.props.transaction.transaction ? this.props.transaction.transaction : {}
        this.setState({
          status:"Completed",
          amountTransferred:transaction.amountTransferred,
          execTime:transaction.execTime,
          transferred:transaction.transferred,
          transcationId:transaction.transcationId,
          dst_address: transaction.dst_address
        })
        
  }
componentWillReceiveProps(NextProps){
  if(NextProps.transaction.transaction){
    const transaction = NextProps.transaction.transaction
        this.setState({
          status:transaction.status,
          amountTransferred:transaction.amountTransferred,
          execTime:transaction.execTime,
          transferred:transaction.transferred,
          transcationId:transaction.transcationId,
          dst_address: transaction.dst_address
        })
  }
}
onChange = (e) => {
  e.preventDefault();
  this.setState({
    [e.target.name]:e.target.value
  });
}
    render() {
      const transaction = this.props.transaction.transaction ? this.props.transaction.transaction : {}
      const {errors} = this.state
    //   const options =[
    //   { label: 'Pending', value: 'Pending' },
    //   { label: 'Completed', value: 'Completed' },
    // ]
    return (
      <div className="updateTrans">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto text-center">
              
              <h3>Transcation Detail</h3>
            <div className="m-1">
                <div className="small">
                    Receiving Address:
                </div>
                <div>
                    {transaction.dst_address}
                </div>
            </div>
            <div className="m-1">
                <div className="small light">
                    Status:
                </div>
                <div>
                    {transaction.status}
                </div>
            </div>
            <div className="m-1">
                <div className="small">
                    Request Time:
                </div>
                <div>
                    {transaction.requestTime}
                </div>
            </div>
            <div className="m-1">
                <div className="small">
                    Transaction Type:
                </div>
                <div>
                    {transaction.transType}
                </div>
            </div>
            <div className="m-1">
                <div className="small">
                    Amount requested:
                </div>
                <div>
                    {transaction.amountRequested}
                </div>
            </div>
            <div className="m-1">
                <div className="small">
                    Amount transferred:
                </div>
                <div>
                    {transaction.amountTransferred}
                </div>
            </div>
            <div className="m-1">
                <div className="small">
                    Transaction ID:
                </div>
                <div>
                    {transaction.transactionId}
                </div>
            </div>
            <Link to="/dashboard" className="btn btn-light"> Go Back</Link>
            
          
            </div>
          </div>
        </div>
      </div>
    )
  }
}

transactionDetail.propTypes={
  transaction:PropTypes.object.isRequired,
  getTransaction:PropTypes.func.isRequired,
  updateTrans:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    transaction: state.transaction
})

export default connect(mapStateToProps,{getTransaction, updateTrans})(withRouter(transactionDetail))