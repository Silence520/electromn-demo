const Store = require('electron-store');
const uuid = require('uuid/v4');
const path = require('path');

class AppStore extends Store {
    constructor(settings) {
        super(settings);
        this.tracks = this.get('tracks') || [];
    }
    saveTracks() {
        this.set('tracks', this.tracks);
        return this;
    }
    getTracks() {
        return this.get('tracks') || [];
    }
    addTracks(tracks) {
        const tracksWithStore = tracks
            .map(track => {
                return {
                    id: uuid(),
                    path: track,
                    name: path.basename(track)
                };
            })
            .filter(track => {
                const current = this.getTracks().map(track => track.path);
                return current.indexOf(track.path) < 0;
            });
        this.tracks = [...this.tracks, ...tracksWithStore];
        return this.saveTracks();
    }
}

module.exports = AppStore;
