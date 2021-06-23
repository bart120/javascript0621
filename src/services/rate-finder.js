export class RateFinder {


    static getRates() {
        /*const prom = fetch('http://localhost:9000/data/rates.json');
        prom.then((resp) => {
            const data = resp.json();
            console.log('data', data);
            return data;
        });*/

        return fetch('http://localhost:9000/data/rates.json').then((resp) => {
            return resp.json();
        });
    }

}