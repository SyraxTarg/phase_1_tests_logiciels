const { loginUser, authMiddleware } = require("../../../services/read/authRead")
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

// 1. On mocke les modules
jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('login user', () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
    jest.clearAllMocks();
  });

  it('login fail - no user', async () => {
    // Arrange
    prismaMock.user.findUnique.mockResolvedValue(null);

    // Act
    const result = await loginUser('testuser', 'password123');

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe('Utilisateur non trouvé');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { username: 'testuser' }
    });
  });

  it('login failed - invalid credentials', async () => {
    // Arrange
    prismaMock.user.findUnique.mockResolvedValue({ id: 1, username: 'testuser', password: 'hashed_password' });
    bcrypt.compare.mockResolvedValue(false);

    // Act
    const result = await loginUser('testuser', 'wrong_password');

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe('Mot de passe incorrect');
  });

  it('login success', async () => {
    // Arrange
    prismaMock.user.findUnique.mockResolvedValue({ id: 1, username: 'testuser', password: 'hashed_password' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('jwt_token');

    // Act
    const result = await loginUser('testuser', 'password123');

    // Assert
    expect(result.success).toBe(true);
    expect(result.token).toBe('jwt_token');
    expect(result.user.username).toBe('testuser');
  });
});


describe('auth middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('no header', () => {
    authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData().error).toBe('Token manquant');
    expect(next).not.toHaveBeenCalled();
  });

  it('header but no bearer', () => {
    req.headers['authorization'] = 'jwt_token';

    authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('invalid token', () => {
    req.headers['authorization'] = 'Bearer invalid_jwt_token';
    jwt.verify.mockImplementation(() => {
      throw new Error('invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.statusCode).toBe(401);
    expect(res._getJSONData().error).toBe('Token invalide');
    expect(next).not.toHaveBeenCalled();
  });

  it('valid token', () => {
    const mockUser = { id: 1, username: 'pikachu' };
    req.headers['authorization'] = 'Bearer jwt_token';

    jwt.verify.mockReturnValue(mockUser);

    authMiddleware(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });
});