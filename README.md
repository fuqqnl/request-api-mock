## request-api-mock

request-api-mock是一个轻量化的node中间件，解决的是在单页或多页应用中，开发时mock接口请求问题。通过简单的输入mock目录所在的位置，并且把api的路径，跟mock目录的路径对应起来，就可以进行接口数据的本地开发。

### Install
request-api-mock requires node.js and npm 

```
    npm install request-api-mock -D
```

### Dictionary

```
// 要请求api的路径
const url = '/api/smart/getlist'

// 对应的mock文件的位置是:
mock/api/smart/getlist.json

对应的文件夹路径为:

| ---mock
|  |
|  |--api
|     |
|     |--smart
|         |-- getlist.json
|
| --- dev.js

```

### Usage

```
const requestApiMock = require('request-api-mock');
const express = require('express');
const app = express();
// .....
app.use(requestApiMock(../mock));

```
