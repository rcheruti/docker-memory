import http from 'k6/http';
import { check } from 'k6';
import { optionsDefault } from './options.js';
export const options = optionsDefault;

// --------------------------------------------------

function createRequest() {
    const size = 20; // always use same size because size can change response time
    const page = Math.round( Math.random() * 50 );

    const url = `http://localhost:9090/pessoa/todos?size=${size}&page=${page}`;
    const params = {
        headers: {
            
        },
    };
    return {
        url: url,
        payload: null,
        params: params,
    };
}
function sendRequest() {
    const request = createRequest();
    return http.get(request.url, request.params);
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