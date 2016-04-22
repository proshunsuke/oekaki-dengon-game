const client = require('./client');
const rooms = require('./rooms');
const socketChannel = require('./socketChannel');
const draw = require('./draw');
const users = require('./users');
const game = require('./game');
const beforeSettingUsers = require('./beforeSettingUsers');
const afterSettingUsers = require('./afterSettingUsers');

module.exports = { client, rooms, socketChannel, draw, users, game, beforeSettingUsers, afterSettingUsers };
