var request = require('superagent');
var assert = require('assert');
var type = require('component-type');
var join = require('join-component');

/*
** Expose an Vero client.
*/
module.exports = Vero;

/*
** Initialize a new Vero client with Vero's auth_token and
** a development mode value
**
** @param {String} authToken
** @param {Object} options (optional)
**     @property {Boolean} developmentMode {default: false}
**     @property {String} baseUrl {default: https://api.getvero.com/}
*/
function Vero (authToken, options) {
  if (!(this instanceof Vero)) return new Vero(authToken, options);
  assert(authToken, "You must pass your Vero's auth token.");
  options = options || {};

  this.authToken = authToken;
  this.development_mode = options.development_mode || false;
  this.baseUrl = options.baseUrl || 'https://api.getvero.com';
}

/*
** Identify a user in Vero
**
** @param {Object} message
** @param {Function} fn (optional)
** @return {Vero}
*/
Vero.prototype.identify = function(message, fn) {
  validate(message);
  assert(message.id, "You must pass an id.");

  this.queue(ENDPOINTS.IDENTIFY, message, fn);
  return this;
}

/*
** Update user properties in Vero
**
** @param {Object} message
** @param {Function} fn (optional)
** @return {Vero}
*/
Vero.prototype.update = function(message, fn) {
  validate(message);
  assert(message.id, "You must pass an id.");
  assert(message.changes, "You must pass a changes object.");

  this.queue(ENDPOINTS.UPDATE, message, fn);
  return this;
}

/*
** Tag a user in Vero
**
** @param {Object} message
** @param {Function} fn (optional)
** @return {Vero}
*/
Vero.prototype.addTags = function(message, fn) {
  validate(message);
  assert(message.id, "You must pass an id.");
  assert(message.add, "You must pass an array of tags to add.");

  this.queue(ENDPOINTS.TAG, message, fn);
  return this;
}

/*
** Untag a user in Vero
**
** @param {Object} message
** @param {Function} fn (optional)
** @return {Vero}
*/
Vero.prototype.removeTags = function(message, fn) {
  validate(message);
  assert(message.id, "You must pass an id.");
  assert(message.remove, "You must pass an array of tags to remove.");

  this.queue(ENDPOINTS.TAG, message, fn);
  return this;
}

/*
** Unsubscribe a user in Vero
**
** @param {Object} message
** @param {Function} fn (optional)
** @return {Vero}
*/
Vero.prototype.unsubscribe = function(message, fn) {
  validate(message);
  assert(message.id, "You must pass an id.");

  this.queue(ENDPOINTS.UNSUBSCRIBE, message, fn);
  return this;
}

/*
** Track an event in Vero
**
** @param {Object} message
** @param {Function} fn (optional)
** @return {Vero}
*/
Vero.prototype.track = function(message, fn) {
  validate(message);
  assert(message.id, "You must pass an id.");
  assert(message.event_name, "You must pass an event_name.");

  this.queue(ENDPOINTS.TRACK, message, fn);
  return this;
}

/*
** Send message to Vero and callback 'fn'
**
** @param {Object} endpoint
** @param {Object} message
** @param {Function} fn (optional)
*/
Vero.prototype.queue = function(endpoint, message, fn) {
  message.auth_token = this.authToken;
  message.development_mode = this.developmentMode;

  if (endpoint.method == 'put') {
    request
      .put(this.baseUrl + endpoint.url)
      .send(message)
      .end(function(err, res){
        err = err || error(res);
        fn(err, res);
      });
  } else {
    request
      .post(this.baseUrl + endpoint.url)
      .send(message)
      .end(function(err, res){
        err = err || error(res);
        fn(err, res);
      });
  }
}

/*
** Define Vero endpoints
*/
var ENDPOINTS = {
  IDENTIFY: {
    method: 'post'
    , url: '/api/v2/users/track'
  },
  UPDATE: {
    method: 'put'
    , url: '/api/v2/users/edit'
  },
  TAG: {
    method: 'put'
    , url: '/api/v2/users/tags/edit'
  },
  UNSUBSCRIBE: {
    method: 'post'
    , url: '/api/v2/users/unsubscribe'
  },
  TRACK: {
    method: 'post'
    , url: '/api/v2/events/track'
  }
}
Vero.ENDPOINTS = ENDPOINTS;

/*
** Validation rules for Vero object
*/
Vero.rules = {
  id: ['number', 'string'],
  data: 'object',
  changes: 'object',
  add: 'array',
  remove: 'array',
  event_name: 'string',
}

/*
** Validate an object properties
**
** @param {Object} obj
*/
function validate(obj) {
  assert('object' == type(obj), "You must pass an object.");
  for (var key in Vero.rules) {
    var val = obj[key];
    if (!val) continue;
    var exp = Vero.rules[key];
    exp = ('array' === type(exp) ? exp : [exp]);
    var a = 'object' == exp ? 'an' : 'a';
    assert(exp.some(function(e){ return type(val) === e; }), '"' + key + '" must be ' + a + ' ' + join(exp, 'or') + '.');
  }
}

/**
 * Get an error from a `res`.
 *
 * @param {Object} res
 * @return {String}
 */

function error(res){
  if (!res.error) return;
  var body = res.body;
  var msg = body.error && body.error.message
    || res.status + ' ' + res.text;
  return new Error(msg);
}
