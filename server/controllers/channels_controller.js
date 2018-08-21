module.exports = {
    readChannels: (req, res) => {
        const db = req.app.get('db');
        db.read_channels().then(channels => {
            res.json({channels}).end();
        })
    },
    createChannel: (req, res) => {
        const db = req.app.get('db');
        const { name, team_id, public } = req.body;
        const newChannel = { name, teamId, public };
        db.create_channel(newChannel).then(channels => {
            ///Send the channel your creatd and the message, and end response. 
            res.json({channel: channels[0], message: 'Channel Created!'}).end();
        }).catch(err => console.log('Create a channel Error-------------', err));
    }
}