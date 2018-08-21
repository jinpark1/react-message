class Channel {
    constructor() {
        this.channels = [];
    }
    addChannelData(socket_id, id, messages, users) {
        const newChannel = {socket_id, id, messages, users};
        this.channels.push(newChannel);
    }
    getChannelData(socket_id) {
        return this.channels.map(channel => channel).filter(channel => channel.socket_id === socket_id)[0];
    }
    removeChannel(socket_id) {
        const channelToRemove = this.channels.findIndex(channel => channel.socket_id === socket_id);
        this.channels.splice(channelToRemove, 1);
        return this.channels;
    }
    // updateMessages(socket_id, messages) {
    //     const channelToUpdate = this.channels.findIndex(channel => channel.socket_id === socket_id);
    //     this.channels[channelToUpdate].messages = messages;
    //     return channels[channelToUpdate];
    // }
    pushMessages(socket_id, message) {
        let channelToUpdate = this.channels.findIndex(ch => ch.socket_id === socket_id);
        this.channels[channelToUpdate].messages.push(message);
        return this.channels[channelToUpdate];
    }
    pushUser(socket_id, user) {
        let channelToUpdate = this.channels.findIndex(ch => ch.socket_id === socket_id);
        this.channels[channelToUpdate].users.push(user);
        return this.channels[channelToUpdate];
    }
    readChannels() {
        return this.channels.map(ch => ch);
    }
}


module.exports = { Channel };