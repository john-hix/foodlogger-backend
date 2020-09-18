import request from "supertest";
import restify from 'restify';
import VerboseInvalidContentError from './field-validation';

// test rig. @TODO: mock authentication so we can use our app instance
const app = restify.createServer();
app.get('/pets-err', (req, res, next) => {
    next(new VerboseInvalidContentError({
      info: {
        cat: 'meow',
        dog: 'ruff'
      }
    }));
});

describe("Printing field validation errors", () => {
  it("should be found on .validation field",  function(done) {
    request(app)
        .get("/pets-err")
        .expect('Content-Type', /json/)
        .then((res) => {
            expect(res.status).toEqual(400);
            expect(res.body.validation.cat).toEqual('meow');
            expect(res.body.validation.dog).toEqual('ruff');
            done();
        });
  });
});


