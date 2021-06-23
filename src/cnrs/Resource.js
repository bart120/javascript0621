const host = 'http://localhost:9000/resources';

export class Resource {
    static getContentEntities(fileName) {
        return fetch(`${host}/${fileName}_entities.html`).then(resp => {
            return resp.text();
        });
    }

    static getContentRtd(fileName) {
        return fetch(`${host}/${fileName}_rtd.html`).then(resp => {
            return resp.text();
        });
    }
}