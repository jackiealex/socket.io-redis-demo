## Download redis from the offfice website and install
+ tar .gz and make
+ start redis-server
```shell
cd src
redis-server
```
+ run redis-client by command below:
```shell
cd src
redis-cli
// then publish a message:
publish chat hello,world
```

## Here is a nodejs websocket and redis app demo, then run
+ start app
```shell
npm install
// then
npm start
```
+ visit the app in your browser: http://127.0.0.1:3000.
