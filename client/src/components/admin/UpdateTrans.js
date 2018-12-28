import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import {getTransaction, updateTrans} from '../../actions/transActions'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import axios from 'axios'
class UpdateTrans extends Component {

constructor(){
  super();
  this.state={
  status:"",
  amountTransferred:null,
  execTime:null,
  transferred:null,
  transcationId:null,
  errors:{}
  }

}
  onSubmit = (e)=>{
    e.preventDefault();
    const data = {
      status:this.state.status,
      amountTransferred:this.state.amountTransferred,
      execTime:Date.now(),
      transcationId:this.state.transcationId
    }
    axios.patch(`/api/transactions/${this.props.match.params.trans_Id}`,data)
    .then( res => this.props.history.push('/admin'))
  }

componentDidMount() {
        this.props.getTransaction(this.props.match.params.trans_Id);
        const transaction = this.props.transaction.transaction ? this.props.transaction.transaction : {}
        this.setState({
          status:transaction.status,
          amountTransferred:transaction.amountTransferred,
          execTime:transaction.execTime,
          transferred:transaction.transferred,
          transcationId:transaction.transcationId
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
          transcationId:transaction.transcationId
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
      const options =[
      { label: 'Pending', value: 'Pending' },
      { label: 'Completed', value: 'Completed' },
    ]
    return (
      <div className="updateTrans">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/admin" className="btn btn-light"> Go Back</Link>
              <h1 className="display-4 text-center">Complete Transcation</h1>
              <p>User: 17</p>
            <p>Adddress: {transaction.dst_address}</p>
            <p>Status: {transaction.status}</p>
            <p>Request Time	: {transaction.requestTime}</p>
            <p>GC Amount {transaction.amountRequested}</p>
            <small className="d-block pb-3">* = required field</small>
            
            <form action="">
              <SelectListGroup
                options={options}
                value = {this.state.status}
                name="status"          
                onChange = {this.onChange}
                info = "New Status"
              />

        
              <TextFieldGroup
                name="amountTransferred"
                placeholder="amount Transferred"
                value = {this.state.amountTransferred}
                error= {errors.amountTransferred}
                info = "Total Blocks transferred"
                onChange = {this.onChange}
              />

              <TextFieldGroup
                name="transcationId"
                placeholder="transcation Id"
                value = {this.state.transcationId}
                error= {errors.transcationId}
                info = "Magna chain transaction ID"
                onChange = {this.onChange}
              />
              <input type="submit" className="btn btn-primary" value="Submit" onClick={this.onSubmit}/> 
            </form>
            
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UpdateTrans.propTypes={
  transaction:PropTypes.object.isRequired,
  getTransaction:PropTypes.func.isRequired,
  updateTrans:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    transaction: state.transaction
})

export default connect(mapStateToProps,{getTransaction, updateTrans})(withRouter(UpdateTrans))