# Tests with k6
*k6 is required to be installed on computer*


To run tests execute the command:  
- `k6 run ______.js`


Possible additional configurations:  
- `--vus 10 --duration 30s`  

This configs can be on code too, exported with:  
```js
export const options = {
    vus: 10,
    duration: '30s',
};
```

------------------------------------------
### Running auxiliary services


Running Database:
```
docker-compose -f docker-compose/docker-compose-mysql.yml up -d

docker-compose -f docker-compose/docker-compose-mysql.yml down
```

