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
        this.setState({ dst_address: nextProps.profile.profile.default_address });
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
        amountRequested: this.state.amountRequested
    };

    console.log(transData);

    this.props.submitRequest(transData, this.props.history);
  }
      
  render() {
    const { errors } = this.state;

    return (
      <div className="request"> 
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                    Go Back
                </Link>
                <h1 className="display-4 text-center">Submit block exchange request</h1>
                <p className="lead text-center">
                    Your current balance: 100500
                </p>
                <small className="d-block pb-3">* = required field</small>
                <form onSubmit={this.onSubmit}>
                    <h6>Number of GC to be exchanged</h6>
                    <small>Reference exchange Rate 1 GC to {this.state.exchangeRate} blocks, approximately {this.state.exchangeRate * this.state.amountRequested} blocks will be received</small>
                    <TextFieldGroup
                    placeholder="* amount Requested"
                    name="amountRequested"
                    value={this.state.amountRequested}
                    onChange={this.onChange}
                    error={errors.amountRequested}
                    />

                    <h6>destination blocks account (receiving the blocks)</h6>
                    <TextFieldGroup
                    placeholder="destination blocks account (receiving the blocks)"
                    name="dst_address"
                    value={this.state.dst_address}
                    onChange={this.onChange}
                    error={errors.dst_address}
                    />

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
  