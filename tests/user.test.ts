// import npm packages.
import supertest from 'supertest';
import testDatabase from '../src/test-database';


// // import file module.
import app from '../src/test-server';


describe('Test user signup code', () => {

  beforeAll(async () => {
    try {
      await testDatabase.connect()
    } catch (error) {
      return console.log(error);
    }
  });

  afterAll(async () => {
    try {
      await testDatabase.close()
    } catch (error) {
      return console.log(error);
    }
  });

  it('add a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const response = await supertest(app).post('/user').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Success");
  });
});




