# podo

A (super) simple hapijs plugin for generating PDF. Uses [pdfmake](http://pdfmake.org/).

## Usage
```js
const Podo = require('podo');
const server = new Hapi.Server();

await server.register({
    plugin: Podo
});
```

## Generate PDF
```js
const definition = {
    content: [ 'Long essay' ]
},

request.server.plugins.podo.generate(definition)
    .then((res) => {

        return res;
    })
    .catch((err) => {

        return err;
    });
```
See [pdfmake](http://pdfmake.org/) for more information.

## Contributing
* Include 100% test coverage.
* Follow the [Hapi coding conventions](http://hapijs.com/styleguide)
* Submit an issue first for significant changes.


