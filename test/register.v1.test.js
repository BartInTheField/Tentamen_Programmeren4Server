//TEST FOR API V1
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var chould = chai.should();

chai.use(chaiHttp);

describe('Register API V1', function () {

    var email = 'test@test.com'

    afterEach(function() {
        var pool = require('../db/connection');
        var query = "DELETE from customer WHERE email ='" + email + "';";
        pool.getConnection(function(err,connection){
            if (err) {
                console.error(err);
            } else {
                connection.query(query, function(err, rows){
                    connection.release();
                    if(err) {
                        console.error(err);
                    }
                })
            }
        })
    });

    it("returns 'Succesfully created' POST /api/v1/register", function (done) {
        var user = {
            firstName: 'Test',
            lastName: 'Meneer',
            email: email,
            password: "test",
        }
        chai.request(require('../index.js'))
            .post('/api/v1/register')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('Response').equal('Succesfully created');
                done();
            });
    });

    it("returns 'There is already a customer with this email' POST /api/v1/register", function (done) {
        var user = {
            firstname: 'Test',
            lastname: 'Meneer',
            email: 'admin@admin.com',
            password: "test",
        }
        chai.request(require('../index.js'))
            .post('/api/v1/register')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response').equal('There is already a customer with this email');
                done();
            });
    });
});
