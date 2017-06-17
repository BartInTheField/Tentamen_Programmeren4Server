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
});
