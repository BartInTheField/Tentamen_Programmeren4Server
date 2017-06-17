//TEST FOR API V1
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var chould = chai.should();

chai.use(chaiHttp);

describe('Login API V1', function () {

    it('returns token, ID, Email, First- and Lastname on POST /api/v1/login', function (done) {
        var user = {
            email: "admin@admin.com",
            password: "admin"
        }
        chai.request(require('../index.js'))
            .post('/api/v1/login')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                res.body.should.have.property('ID');
                res.body.should.have.property('email');
                res.body.should.have.property('firstname');
                res.body.should.have.property('lastname');
                done();
            });
    });

    it("returns 'Invalid credentials' on POST /api/v1/login with wrong password", function (done) {
        var user = {
            email: "admin@admin.com",
            password: ""
        }
        chai.request(require('../index.js'))
            .post('/api/v1/login')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equal('Invalid credentials');
                done();
            });
    });

    it("returns 'Email not found' on POST /api/v1/login with wrong email", function (done) {
        var user = {
            email: "",
            password: "password"
        }
        chai.request(require('../index.js'))
            .post('/api/v1/login')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equal('Email not found');
                done();
            });
    });
});
