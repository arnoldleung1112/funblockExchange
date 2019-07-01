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
        default_address: "",
        errors:{}
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
    let explorerLink;

    if (this.props.profile.profile && this.props.profile.profile.deposit_address)
    {
        explorerLink = "https://explorer.ont.io/address/" + this.props.profile.profile.deposit_address + "/ALL/20/1/testnet"
    }
    
    errors = this.props.errors;

    if(this.state.displayUpdate){
        updatecontent = (
            
            <card>
                <card-content>
                    <form className="col-md-12" action="">
                            <label htmlFor="defaultAcount"> New Default BLUX withdrawal Account: </label> 
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
                        <h4>Game Coin Account Balance: </h4>
                        <h2 className="strong">
                        {this.props.profile.profile && this.props.profile.profile.balance}
                        </h2>
                    </div>
                    
            </div>

            <div className="row"> 
                <div className="col-md-12 card">
                    <h5>BLUX (Ontology) Account: </h5>
                    <div className="small">
                    <a target="_blank" href={explorerLink}>view in explorer</a>
                    </div>
                    <p> 
                        {this.props.profile.profile && this.props.profile.profile.deposit_address} 
                    </p>    
                    <h4> BLUX Balance:</h4>
                    <h2> {this.props.profile.profile && this.props.profile.profile.bluxBalance} </h2>   
                 </div>           
            </div>

            <div className="row"> 
                <div className="col-md-12 card">
                    <h4>Default PAX withdrawal Account:</h4>
                    <p> {this.props.profile.profile && this.props.profile.profile.default_address} </p>
                    <a className=""onClick={this.displayUpdate}> 
                        <u>
                        {this.state.displayUpdate ? "Hide": "Update" } 
                        </u>      
                    </a>

                       {updatecontent && updatecontent}                    
                 </div>           
            </div>

            

      
            <TransTable trans={this.props.transaction.transactions}/>
      
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
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStatetoProps, {getTransactions, getProfile, setProfile})(Dashboard);