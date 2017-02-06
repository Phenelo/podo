# podo

A (super) simple hapijs plugin for generating PDF. Uses [pdfmake](http://pdfmake.org/).

## Usage
```js
const Podo = require('podo');
const server = new Hapi.Server();

server.register({
    register: Podo
}, (err) => {

      return next(err);
});
```

## Generate PDF
```js
const definition = {
    content: [ 'Long essay' ]
},

request.server.plugins.podo.generate(definition, (err, res) => {

    if (err) {
        console.log(err);

        return reply(err);
    }

    return reply(res);
});
```
See [pdfmake](http://pdfmake.org/) for more information.

## Contributing
* Include 100% test coverage.
* Follow the [Hapi coding conventions](http://hapijs.com/styleguide)
* Submit an issue first for significant changes.


