//TEST FOR API V1
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var chould = chai.should();

chai.use(chaiHttp);

describe('Rentals API V1', function () {

    var email = 'admin@admin.com';
    var token;

    beforeEach(function() {
        var auth = require('../auth/authentication');
        token = auth.encodeToken(email);
    });


    
    it('returns all active rentals on GET /api/v1/rentals/activeRentals', function(done) {
        chai.request(require('../index.js'))
        .get('/api/v1/rentals/activeRentals')
        .set('X-Access-Token', token)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('Active');
            done();
        });
    });

    it('returns rented films for a customer GET /api/v1/rentals/:userid', function(done) {
        chai.request(require('../index.js'))
            .get('/api/v1/rentals/8')
            .set('X-Access-Token', token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Movies');
                done();
            });
    });

    it('returns 400 when user doesnt exist or user doesnt have rented movies on GET /api/v1/rentals/:userid', function(done) {
        chai.request(require('../index.js'))
            .get('/api/v1/rentals/1')
            .set('X-Access-Token', token)
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equals("Bad request");
                done();
            });
    });

    it('returns 200 and creates a rental on POST /api/v1/rentals/:userid/:inventoryid', function(done) {
        chai.request(require('../index.js'))
            .post('/api/v1/rentals/8/200')
            .set('X-Access-Token', token)
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equals("Created rental succesfully");
                done();
            });
    });

    it('returns 200 and puts active to 0 on a rental on PUT /api/v1/rentals/:userid/:inventoryid', function(done) {
        chai.request(require('../index.js'))
            .put('/api/v1/rentals/8/200')
            .set('X-Access-Token', token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equals("Rental updated");
                done();
            });
    });

    it('returns 200 and deletes a rental on DELETE /api/v1/rentals/:userid/:inventoryid', function(done) {
        chai.request(require('../index.js'))
            .delete('/api/v1/rentals/8/200')
            .set('X-Access-Token', token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equals("Rental deleted");
                done();
            });
    });
});
