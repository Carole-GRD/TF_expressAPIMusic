

class TrackDTO {
    constructor({ id, title, duration}){
        this.id = id;
        this.title = title;
        this.duration = duration;
    }
}

module.exports = { TrackDTO };