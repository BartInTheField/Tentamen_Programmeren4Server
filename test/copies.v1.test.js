//TEST FOR API V1
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var chould = chai.should();

chai.use(chaiHttp);

describe('Copies API V1', function(){

    it('returns all copies of a movie on GET /api/v1/copies/:filmid', function(done) {
        chai.request(require('../index.js'))
        .get('/api/v1/copies/1')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('Copies');
            done();
        });
    });


    it('gives status: 400 on GET /api/v1/films/filmid: with a filmid that does not exist', function(done) {
        chai.request(require('../index.js'))
        .get('/api/v1/copies/2314')
        .end(function(err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('Response').equals("Bad request");
            done();
        });
    });

});