import http from 'k6/http';
import { check } from 'k6';
import { optionsDefault } from './options.js';
export const options = optionsDefault;

// --------------------------------------------------

function createRequest() {
    const url = `http://localhost:9090/carro`;
    const payload = JSON.stringify({
        nome: 'Meu carro',
        cor: 'vermelho',
        ano: 2022,
        pessoa: Math.round( Math.random() * 1000 ),
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return {
        url: url,
        payload: payload,
        params: params,
    };
}
function sendRequest() {
    const request = createRequest();
    return http.post(request.url, request.payload, request.params);
}

// --------------------------------------------------

export function setup() {
    console.log(`Starting...`);
    // send some requests to warm up
    for(let i = 10; i > 0; i--) sendRequest();
}
export default function () {
    const res = sendRequest();
    check(res, {
        'is status 2xx': (r) => r.status >= 200 && r.status <= 299,
    });
}
export function teardown(data) {
    console.log(`Finished.`);
}