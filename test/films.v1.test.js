//TEST FOR API V1
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var chould = chai.should();

chai.use(chaiHttp);

describe('Films API V1', function(){

    it('returns all movies on GET /api/v1/films', function(done) {
        chai.request(require('../index.js'))
        .get('/api/v1/films')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('Movies');
            done();
        });
    });

    it('returns one movie on GET /api/v1/films/:filmid', function(done) {
        chai.request(require('../index.js'))
        .get('/api/v1/films/4')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('film_id');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('release_year');
            res.body.should.have.property('language_id');
            res.body.should.have.property('original_language_id');
            res.body.should.have.property('rental_duration');
            res.body.should.have.property('rental_rate');
            res.body.should.have.property('length');
            res.body.should.have.property('replacement_cost');
            res.body.should.have.property('rating');
            res.body.should.have.property('special_features');
            res.body.should.have.property('last_update');
            done();
        });
    });

    it('gives status: 400 on GET /api/v1/films/filmid: with a filmid that does not exist', function(done) {
        chai.request(require('../index.js'))
        .get('/api/v1/films/10000000')
        .end(function(err, res) {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('Response').equals("Can't find movie with this id.");
            done();
        });
    });

});