module.exports = {
    readGroupMessages: (req, res) => {
        
    },
    readChannelMessages: (req, res) => {
        //Assign databsae instance from the request app.get method.
        const db = req.app.get('db');
        //get channel id from request params
        const { id } = req.params;
        db.read_channel_messages(id).then(messages => {
            res.json({messages}).end();
        }).catch(err => console.log('Read Messages Error---------', err));
    },
}