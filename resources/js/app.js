import React    from 'react'
import ReactDOM from 'react-dom'
import Router   from './routes/Router'

window.bootstrap = require('bootstrap');
// window._ = require('lodash')

if (document.getElementById('root')) {
    ReactDOM.render(<Router/>, document.getElementById('root'));
}