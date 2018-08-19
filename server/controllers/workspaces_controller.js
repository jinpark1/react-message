module.exports = {
    createWorkspace: (req, res) => {
        //define your db inst acnce in a a variable called db
        const db = req.app.get('db');
        //Destruct the needed from values for creating a workspace.
        const { email, name, password, company_name } = req.body;
        //Assign a newWorkspace with it's need properties.
        const newWorkspace = { email, name, password, company_name };
        db.create_workspace(newWorkspace).then(workspaces => {
            res.status(200).json({workspace: workspaces[0]})
        }).catch(err => console.log('Create Workspace-----------', err));
    },
    readWorkspaces: (req, res) => {
        const db = req.app.get('db');
        db.read_workspaces().then(workspaces => {
            res.status(200).json({workspaces});
        }).catch(err => console.log('Read Workspaces Error---------', err));
    },
    readUsers: (req, res) => {
        const db = req.app.get('db');
        const { id }= req.params;
        db.read_users(id).then(workspaces => {
            res.status(200).json({users: workspaces[0].users});
        }).catch(err => console.log('Read Users Error------------', err));
    },
    verificationCode: (req, res) => {
        //Assign db variable from teh req.app.get method
        const db = req.app.get('db');
        const { code } = req.body;
        db.verify_code(code).then(codes => {
            if(codes.length) {
                res.status(200).json({message: 'Code Matches'});
            } else {
                res.status(404).json({message: 'Code does not match!'});
            }
        }).catch(err => console.log('Get Codes Error---------', err));
    } 
}