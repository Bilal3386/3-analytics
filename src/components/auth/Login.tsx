import React from "react";
import classes from "./Login.module.css";
import { withRouter, RouteComponentProps  } from 'react-router-dom';


interface ILoginState {
  userName: string;
  password: string;
  error: string;
}


class Login extends React.Component<RouteComponentProps, ILoginState> {

    state = {
        userName: '',
        password: '',
        error: ''
    }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const {name, value} = event.target;
    this.setState({[name]: value} as Pick<ILoginState, keyof ILoginState>)
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {userName, password} = this.state

    if(userName === 'admin' && password === 'admin@123')
    {
      
      this.setState({error: ''})
      this.props.history.push('/');
}else {
        this.setState({error: 'Incorrect username or password'})
    }
  }
  render() {
    const {error} = this.state
    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <label>Email: </label>
        <input
        autoComplete="on"
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleChange}
          required
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          autoComplete="current password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        {error ? <p style={{color: 'red'}}>{error}</p>:<></>}
        <button>LOGIN</button>
      </form>
    );
  }
}

export default withRouter(Login);
