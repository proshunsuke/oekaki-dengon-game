if ( __DEV__ ) {
    module.exports = require('./DevToolsComponent');
} else {
    module.exports = require('./ProdComponent');
}
