//import brcrypt to hash your passwordds
const bcrypt = require("bcryptjs");
//import nodemailer controller for verifying email.
const nodemailerController = require('./nodemailer_controller');
module.exports = {
    readUserData: (req, res) => {
        res.json({user: req.session.user});
    },
    register: (req, res) => {
        ///Assign your dbInstance
        const db = req.app.get('db');
        ///Destrcut your needed valeus from your request bdoy
        const { email, username, name, profile_picture, password } = req.body;
        //Check if the user got a verification email from workspace url.
        // db.get_users_from_workspace(workspaceUrl).then(workspaces => {
        //     let filteredResult = workspaces[0].users.filter(user => user.email === email);
        db.find_user(username).then(users => {
            if(users.length) {
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = {
                        username,
                        email,
                        name,
                        password: hashedPassword,
                        profile_picture
                    };
                    db.register(newUser).then(users => {
                        //Delete the password from the user. 
                        delete users[0].password;
                        //Assign the user sent from the users[0]ponse to the session
                        req.session.user = users[0];
                        nodemailerController.verifyEmail(db, users[0].id, users[0].email);
                        users.json({user: req.session.user, message: `Registered Successfully ${users[0].username}`});
                    }).catch(err => console.log("Register Error-----------", err));
                }).catch(err => console.log('Hashing Error---------', err));
            //Else if the user is not found send them message telling them to request to join the workspace. 
            } else {
                res.status(404).json({message: "Must request to join workspace first!!"});
            }
        }).catch(err => console.log('Get User url error--------', err));
    },
    login: (req, res) => {
        //assign your database instance 
        const db = req.app.get('db');
        const { username, password } = req.body;
        //Now we are gonna find the user in the workspace.
        db.find_user(username).then(users => {
            if(users.length) {
                bcrypt.compare(password, users[0].password).then(doPasswordMatch => {
                    if(doPasswordMatch) {
                        delete users[0].password;
                        req.session.user = users[0];
                        res.status(200).json({user: req.session.user, message: `Welcome ${users[0].username}!`});
                    }
                }).catch(err => console.log('Compare Error-----------', err));
            }
        }).catch(err => console.log('Find user Error--------', err));
    },
    signUpForWorkspace: (req, res) => {
        //Assign db to the database instance from the database request get
        const db = req.app.get('db')
        //Destruct the email and workspace url 
        const { email, workspaceUrl } = req.body;
        db.look_up_workspace(workspaceUrl).then(workspaces => {
            const copyOfArr = workspaces[0].users.slice();
            ///Copy the array and map over it that returns a new array, then filter it based on email.
            let filteredUser = copyOfArr.map(user => user).filter(user => user.email === email);
            //If the filteredUser length is less than 0 than push email with current time. 
            !filteredUser.length && copyOfArr.push({email,date: (new Date()).getTime()});
            //Then udpate the workspace
            db.update_workspace_users(copyOfArr).then(workspaceResult => {
                res.json({workspace: workspaceResult[0].workspace_url, email: email});
            }).catch(err => console.log('Update Workspaces---------', err));
        }).catch(err => console.log('Look up workspaces Error-----------', err));
    },
    loginToWorkspace: (req, res) => {
        //Assign db to the db instance from the database request get method.
        const db = req.app.get('db');
        const { workspaceUrl }= req.body;
        ///find the workspace
        db.look_up_workspace(workspaceUrl).then(workspaces => {
            if(workspaces.length) {
                //if it found return a boolean 
                res.json({found: true});
            } else {
                //If not found.
                res.json({found: false});
            }
        }).catch(err => console.log('Workspace found---------', err));
    }
}