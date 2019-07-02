import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitRequest } from '../../actions/transActions';
import {getProfile} from '../../actions/profileActions'
import axios from 'axios';

 class Request extends Component {
constructor(props){
    super(props);
    this.state={
        dst_address:"",
        amountRequested:"",
        exchangeRate:0,
        balance:0,
        errors:{}
    }
}

componentDidMount = () => {
    axios.get('/api/utils/exchangeRate')
    .then(res => this.setState({exchangeRate: res.data.Rate}));
    this.props.getProfile();


}

componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
        this.setState({ dst_address: nextProps.profile.profile.deposit_address, balance: nextProps.profile.profile.balance });
      }
  }

onChange = (e) =>  {
        this.setState({ [e.target.name]: e.target.value });
}

onSubmit= (e) =>  {
    e.preventDefault();

    const transData = {
        user_uid: this.props.auth.user.uid,
        dst_address: this.state.dst_address,
        amountRequested: this.state.amountRequested,
        transType: "GcToBlux"
    };

    console.log(transData);

    this.props.submitRequest(transData, this.props.history);
  }
      
  render() {
    const { errors } = this.props;
    let explorerLink;

    if (this.props.profile.profile && this.props.profile.profile.deposit_address)
    {
        explorerLink = "https://explorer.ont.io/address/" + this.props.profile.profile.deposit_address + "/ALL/20/1/testnet"
    }

    return (
      <div className="request"> 
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                    Go Back
                </Link>
                <h1 className="display-4 text-center">Game Coin to BLUX</h1>
                <p className="lead text-center">
                    Your current GC balance: {this.state.balance}
                </p>
                <small className="d-block pb-3">* = required field</small>
                <form onSubmit={this.onSubmit}>
                    <h5>Number of GC to be exchanged</h5>
                    <small>Reference exchange Rate 1 GC to {this.state.exchangeRate} BLUX, approximately {this.state.exchangeRate * this.state.amountRequested} BLUX will be received</small>
                    <TextFieldGroup
                    placeholder="* amount Requested"
                    name="amountRequested"
                    value={this.state.amountRequested}
                    onChange={this.onChange}
                    error={errors.amountRequested}
                    />

                    <h5>destination BLUX account (receiving the BLUX)</h5>
                    <div className="small">
                    <a target="_blank" href={explorerLink}>view in explorer</a>
                    </div>
                    <p>{this.state.dst_address}</p>
                    

                    <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                    />
                </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Request.propTypes = {
    submitRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { submitRequest, getProfile })(
    withRouter(Request)
  );
  