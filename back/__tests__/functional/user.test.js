const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { runSeeds, clearDatabase } = require('./setup');

require('dotenv').config({path: '.env.test'});

let app;
let prisma;
let validToken;
const JWT_SECRET = process.env.JWT_SECRET;

describe('User Endpoints - Functional Tests', () => {
  beforeAll(async () => {
    await runSeeds();

    app = express();
    app.use(express.json());

    const userRouter = require('../../routes/user');
    app.use('/users', userRouter);

    validToken = jwt.sign({ id: 1, username: 'Alice' }, JWT_SECRET, { expiresIn: '15min' });
  });

  afterAll(async () => {
    await clearDatabase();
  });

  describe('GET /users', () => {
    it('should get all users when authenticated', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('username');
    });

    it('should fail without authentication token', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Token');
    });

    it('should fail with invalid token', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should fail with malformed authorization header', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', 'InvalidFormat');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return all users with correct data structure', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      response.body.forEach((user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
      });
    });
  });

  describe('GET /users/me', () => {
    it('should get current user when authenticated', async () => {
      const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.username).toBe('Alice');
    });

    it('should fail without authentication', async () => {
      const response = await request(app).get('/users/me');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return different user for different tokens', async () => {
      const bobToken = jwt.sign({ id: 2, username: 'Bob' }, JWT_SECRET, { expiresIn: '15min' });

      const aliceResponse = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${validToken}`);

      const bobResponse = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${bobToken}`);

      expect(aliceResponse.body.id).toBe(1);
      expect(aliceResponse.body.username).toBe('Alice');
      expect(bobResponse.body.id).toBe(2);
      expect(bobResponse.body.username).toBe('Bob');
    });
  });

  describe('GET /users/:user_id', () => {
    it('should get user by id when authenticated', async () => {
      const response = await request(app)
        .get('/users/1')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.username).toBe('Alice');
    });

    it('should get different user by id', async () => {
      const response = await request(app)
        .get('/users/2')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(2);
      expect(response.body.username).toBe('Bob');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/users/999')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Utilisateur');
    });

    it('should fail without authentication', async () => {
      const response = await request(app).get('/users/1');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
