// NOTE: this test requires that process.env.CLIENT_TEST_USER_CREATE
// be set with a valid, existing auth0 user ID

process.env.DB_NAME = 'test_users_http'; // Created in cli migration
import app from "../app";
import request from "supertest";

import User from '../models/user'; // ONLY to clean db before test

beforeAll((done) => {
    User.destroy({
        force: true,
        truncate: true,
        cascade: true
    })
    .then(() => {
        done();
    });
});

afterAll((done) => {
    User.sequelize?.close().then(() => { done(); })
});


describe("POST /users", () => {
  it("should create a user", (done) => {
    if (!process.env.CLIENT_TEST_USER_CREATE) {
        throw new Error("users.test.ts requires process.env.CLIENT_TEST_USER_CREATE");
    }
    request(app)
        .post("/users")
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + process.env.CLIENT_TEST_TOKEN)
        .expect(201)
        .send({
            'auth0Id': process.env.CLIENT_TEST_USER_CREATE
        })
        .then(user => {
            expect(user.body.auth0Id).toBe(process.env.CLIENT_TEST_USER_CREATE);
            done();
        });
  });

  it('should require auth0 id', (done) => {
    request(app)
        .post("/users")
        .expect('Content-Type', /json/)
        .set('Authorization', 'Bearer ' + process.env.CLIENT_TEST_TOKEN)
        .expect(400) 
        .then(res => { // sent without request body
            expect(res.body.code).toBe('InvalidContent');
            expect(res.body.message).toBe('Invalid auth0Id');
            done();
        });
  });
});
