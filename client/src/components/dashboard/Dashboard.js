import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {getTransactions} from '../../actions/transActions'
import {getProfile, setProfile} from '../../actions/profileActions'
import {connect} from 'react-redux'
import TransTable from './TransTable'
import TextFieldGroup from '../common/TextFieldGroup';

class Dashboard extends Component {

constructor(){
    super()
    this.state={
        displayUpdate: false,
        default_address: ""
    }
}

componentDidMount(){
    this.props.getTransactions();
    this.props.getProfile();
}

displayUpdate = (e) =>{
    e.preventDefault();
    this.setState({
        displayUpdate: !this.state.displayUpdate
    }
        
    )
}

updateProfile = (e) => {
    e.preventDefault();
    this.props.setProfile(this.state.default_address)
}

onChange = (e) => {
    this.setState({
        [e.target.name]:e.target.value
    })
}
  render() {
    let errors = {};
    let updatecontent;
    if(this.state.displayUpdate){
        updatecontent = (
            
            <card>
                <card-content>
                    <form className="col-md-8" action="">
                            <label htmlFor="defaultAcount"> New Default Block Account: </label> 
                            <TextFieldGroup 
                            placeholder={this.props.profile.profile && this.props.profile.profile.default_address}
                            name="default_address"
                            value={this.state.default_address}
                            onChange={this.onChange}
                            error={errors.default_address}
                            />
                            <input type="submit" className=" btn btn-primary" value="submit" onClick={this.updateProfile} /> 
                    </form>
                </card-content>
            </card>
            
        )
    }

    return (
    <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead text-muted">Welcome {this.props.auth.user.username}</p>
                </div>
            </div>
                
            <div className="row">  
                                       
                    <div className="col-md-12 mb-4">
                        <p>GC Account Balance: {this.props.profile.profile && this.props.profile.profile.balance}</p>
                    </div>
                    
            </div>
            <div className="row"> 
                <div className="col-md-12">
                    <p>Default Block Account: {this.props.profile.profile && this.props.profile.profile.default_address} <span className="btn btn-primary"onClick={this.displayUpdate}> {this.state.displayUpdate ? "Hide": "Update" } </span></p>
                    
                </div>        
            
            {updatecontent && updatecontent}
                            
            </div>
            <div className="row"> 
                <TransTable trans={this.props.transaction.transactions}/>
            </div>
        </div>
    </div>


    )
  }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired
}

const mapStatetoProps = state => ({
    auth:state.auth,
    transaction: state.transaction,
    profile: state.profile
})

export default connect(mapStatetoProps, {getTransactions, getProfile, setProfile})(Dashboard);