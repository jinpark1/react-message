import React from 'react';
// import ro
//import withRouter to redirect the user after they register 
import { withRouter } from 'react-router-dom';
//import your decorator for all your functionality
import  decorator from './RegisterFormDecorator';
//import material-ui components
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
///import css file to property set the widths and height of the material ui compoents.
import './RegisterForm.css';

const RegisterForm = (props) => {
    //Destruct your properties from props
    const { username, profile_picture, name, email, password, confirm_password } = props;
    return (
        <div className='register form'>
            <Avatar src={profile_picture} alt={name} />
            <input type="file" onChange={props.handleUpload} />
            <Typography>Name</Typography>
            <TextField 
            id="name-register"
            className='register form-text-field'
            onChange={(e) => props.handleName(e.target.value)}
            value={name}
            margin="normal"
            />
            <Typography>Username</Typography>
            <TextField 
            id="username-register"
            className='register form-text-field'
            onChange={(e) => props.handleUsername(e.target.value)}
            value={username}
            margin="normal"
            />
            <Typography>Email</Typography>
            <TextField 
            id="email-register"
            className='register form-text-field'
            onChange={(e) => props.handleEmail(e.target.value)}
            value={email}
            margin="normal"
            />
            <Typography>Password</Typography>
            <TextField 
            id="password-register"
            className='register form-text-field'
            onChange={(e) => props.handlePassword(e.target.value)}
            value={password}
            margin="normal"
            />
            <Typography>Confirm Password</Typography>
            <TextField 
            id="confirm-password-register"
            className='register form-text-field'
            onChange={(e) => props.handleConfirmPassword(e.target.value)}
            value={confirm_password}
            margin="normal"
            />
            <Button variant="outlined" onClick={props.onClick}>Register</Button>
        </div>
    );
};

const decoratedRegisterForm = decorator(RegisterForm);

export default withRouter(decoratedRegisterForm);