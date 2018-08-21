import React, { Component } from 'react';
//import your presentational component
import RegisterForm from '../../presentational/RegisterForm/RegisterForm';
//import axxios to communicate with your backend. 
import axios from 'axios';

export default class RegisterPage extends Component {
    constructor() {
        //Initializes React Component class.
        super();
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            profile_picture: ''
        }
    }
    handleUpload = file => {
        //Do a axios call 
        return axios.get('/api/upload').then(res1 => {
            //Now define your formData
            const formData = new FormData();
            formData.append("signature", res1.data.payload.signature);
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
            formData.append("timestamp", res1.data.payload.timestamp);
            formData.append("file", file);
            for(let key in formData.entries()) {
                console.log('key------------------', key);
            }
            //Now post the data to your cloudinary database. 
            axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData).then(res2 => {
                //Now setState of profile picture 
                this.setState({profile_picture: res2.data.secure_url});
            }).catch(err => console.log("Uploading Images Axios Error--------", err));
        }).catch(err => console.log('Upload Error--------', err));
    }
    handleName = name => {
        this.setState({name});
    }
    handleUsername = username => {
        this.setState({username})
    }
    handleEmail = email => {
        this.setState({email});
    }
    handlePassword = password => {
        this.setState({password});
    }
    handleConfirmPassword = confirm_password => {
        this.setState({confirm_password});
    }
    register = () => {
        console.log('register hit----------');
        //Destruct needed values from teh state to create a new user.
        const { name, profile_picture, username, email, password, confirm_password } = this.state;
        const newUser = { name, profile_picture, username, email, password, confirm_password };
        console.log('newUser----------------', newUser);
        //Make sure to return the promise to end the method's execution.
        return axios.post('/user/register', newUser).then(res => {
            alert(res.data.message);
            //Redux action.
        }).catch(err => console.log('Register User Error----------', err));
    }
    render() {
        return (
            <div className='register container'>
                <RegisterForm {...this.state} handleUsername={this.handleUsername} handlePassword={this.handlePassword} 
                handleEmail={this.handleEmail} handleConfirmPassword={this.handleConfirmPassword} register={this.register}
                handleUpload={this.handleUpload} handleName={this.handleName}/>
            </div>
        );
    }
}