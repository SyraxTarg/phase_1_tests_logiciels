const { findCardsByUserId, findCards } = require("../../../services/card")
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');

// 1. On mocke les modules
jest.mock('@prisma/client', () => {
  const mPrisma = {
    card: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});


const cardMock1 = {
      name: "Mustébouée",
      description: "Pokémon aquabelette",
      type: "Eau",
      pv: 70,
      masked: false,
      image: "image",
      user: { connect: { id: 1 } },
    }

const cardMock2 = {
      name: "Tiplouf",
      description: "Pokémon pingouin",
      type: "Eau",
      pv: 70,
      masked: false,
      image: "image",
      user: { connect: { id: 1 } },
    }

const cardMock3 = {
      name: "Lugulabre",
      description: "Pokémon invitation",
      type: "Psy",
      pv: 140,
      masked: false,
      image: "image",
      user: { connect: { id: 3 } },
    }

const cardMock4 = {
      name: "Kyurem",
      description: "Pokémon frontière",
      type: "Dragon",
      pv: 170,
      masked: false,
      image: "image",
      user: { connect: { id: 3 } },
    }

describe('findCardsByUserId', () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
    jest.clearAllMocks();
  });


  it('findCardsByUserId - no result', async () => {
    // Arrange
    prismaMock.card.findMany.mockResolvedValue([]);

    // Act
    const result = await findCardsByUserId(1);

    // Assert
    expect(result).toEqual([]);
  });

  it('findCardsByUserId - success', async () => {
    // Arrange
    prismaMock.card.findMany.mockResolvedValue([cardMock1, cardMock2]);

    // Act
    const result = await findCardsByUserId(1);

    // Assert
    expect(result).toEqual([cardMock1, cardMock2]);
  });
});


describe('findCards', () => {
  let prismaMock;

  beforeEach(() => {
    prismaMock = new PrismaClient();
    jest.clearAllMocks();
  });


  it('findCards - no filter', async () => {
    // Arrange
    prismaMock.card.findMany.mockResolvedValue([cardMock1, cardMock2, cardMock3]);

    // Act
    const result = await findCards(null, null);

    // Assert
    expect(result).toEqual([cardMock1, cardMock2, cardMock3]);
  });

  it('findCards - name filter', async () => {
    // Arrange
    prismaMock.card.findMany.mockResolvedValue([cardMock2, cardMock3]);

    // Act
    const result = await findCards("l", null);

    // Assert
    expect(result).toEqual([cardMock2, cardMock3]);
  });

  it('findCards - type filter', async () => {
    // Arrange
    prismaMock.card.findMany.mockResolvedValue([cardMock1, cardMock2]);

    // Act
    const result = await findCards(null, "eau");

    // Assert
    expect(result).toEqual([cardMock1, cardMock2]);
  });

  it('findCards - type and name filter', async () => {
    // Arrange
    prismaMock.card.findMany.mockResolvedValue([cardMock2]);

    // Act
    const result = await findCards("l", "eau");

    // Assert
    expect(result).toEqual([cardMock2]);
  });
});
