var assert = require('assert');
var Vero = require('..');

var v;

describe('Vero', function(){
  beforeEach(function(){
    v = Vero('MY_AUTH_TOKEN', {
      baseUrl: 'http://localhost:4242'
    });
  });

  it("should expose a constructor", function(){
    assert.equal('function', typeof Vero);
  });

  it("should require an auth token", function(){
    assert.throws(Vero, error("You must pass your Vero's auth token."));
  });

  it("should not require the new keyword", function(){
    assert(v instanceof Vero);
  });

  it("should set default options", function(){
    var v = Vero('key');
    assert.equal(v.authToken, 'key');
    assert.equal(v.development_mode, false);
    assert.equal(v.baseUrl, 'https://api.getvero.com');
  });

  it("should should take options", function(){
    var v = Vero('key', {
      development_mode: true,
      baseUrl: 'x'
    });
    assert.equal(v.authToken, 'key');
    assert.equal(v.development_mode, true);
    assert.equal(v.baseUrl, 'x');
  });

  describe("#identify", function(){
    it("should validate the message", function(){
      assert.throws(v.identify, error("You must pass an object."));
    });

    it("should require an id", function(){
      assert.throws(function(){
        v.identify({});
      }, error("You must pass an id."));
    });

    it("should send a message to IDENTIFY endpoint", function(done){
      v.identify({id: 1}, function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
    });
  });

  describe("#update", function(){
    it("should validate the message", function(){
      assert.throws(v.update, error("You must pass an object."));
    });

    it("should require an id", function(){
      assert.throws(function(){
        v.update({});
      }, error("You must pass an id."));
    });

    it("should require a changes object", function(){
      assert.throws(function(){
        v.update({id: 1});
      }, error("You must pass a changes object."));
    });

    it("should send a message to UPDATE endpoint", function(done){
      v.update({id: 1, changes: { firstName: 'Jeff', lastName: 'Kane' } }, function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
    });
  });

  describe("#addTags", function(){
    it("should validate the message", function(){
      assert.throws(v.addTags, error("You must pass an object."));
    });

    it("should require an id", function(){
      assert.throws(function(){
        v.addTags({});
      }, error("You must pass an id."));
    });

    it("should require an addTags", function(){
      assert.throws(function(){
        v.addTags({id: 1});
      }, error("You must pass an array of tags to add."));
    });

    it("should send a message to TAG endpoint", function(done){
      v.addTags({id: 1, add: ['developer', 'us', 'us-ca']}, function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
    });
  });

  describe("#removeTags", function(){
    it("should validate the message", function(){
      assert.throws(v.removeTags, error("You must pass an object."));
    });

    it("should require an id", function(){
      assert.throws(function(){
        v.removeTags({});
      }, error("You must pass an id."));
    });

    it("should require an removeTags", function(){
      assert.throws(function(){
        v.removeTags({id: 1});
      }, error("You must pass an array of tags to remove."));
    });

    it("should send a message to TAG endpoint", function(done){
      v.removeTags({id: 1, remove: ['developer', 'us', 'us-ca']}, function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
    });
  });

  describe("#unsubscribe", function(){
    it("should validate the message", function(){
      assert.throws(v.unsubscribe, error("You must pass an object."));
    });

    it("should require an id", function(){
      assert.throws(function(){
        v.unsubscribe({});
      }, error("You must pass an id."));
    });

    it("should send a message to UNSUBSCRIBE endpoint", function(done){
      v.unsubscribe({id: 1}, function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
    });
  });

  describe("#track", function(){
    it("should validate the message", function(){
      assert.throws(v.track, error("You must pass an object."));
    });

    it("should require an id", function(){
      assert.throws(function(){
        v.track({});
      }, error("You must pass an id."));
    });

    it("should require an eventName", function(){
      assert.throws(function(){
        v.track({id: 1});
      }, error("You must pass an event_name."));
    });

    it("should send a message to TRACK endpoint", function(done){
      v.track({id: 1, event_name: 'test'}, function(err, res){
        if (err) return done(err);
        assert.equal(res.status, 200);
        done();
      });
    });
  });
});

/**
 * Assert an error with `message` is thrown.
 *
 * @param {String} message
 * @return {Function}
 */

function error(message){
  return function(err){
    return ((err instanceof Error) && err.message == message);
  };
}