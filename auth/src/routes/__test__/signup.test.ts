import request from 'supertest';
import { app } from '../../app';

it('retunrs a 201 on successfull signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('retunrs a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testxx',
      password: 'password',
    })
    .expect(400);
});

it('retunrs a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1',
    })
    .expect(400);
});

it('retunrs a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  // First a user has to sign up
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teste@test.com',
      password: 'password',
    })
    .expect(201);

  // Then if a user tries to signup with
  // the same credential a 400 error is expected
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teste@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'teste@test.com',
      password: 'password',
    })
    .expect(201);
  
  expect(response.get('Set-Cookie')).toBeDefined();
});
