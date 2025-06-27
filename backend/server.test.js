const request = require('supertest');
const express = require('express');
const server = require('./server'); // assuming server.js exports your app


describe('GET /api/asteroids', () => {
  it('should return asteroid data from NASA', async () => {
    const response = await request(server).get('/api/asteroids')
      .query({ start_date: '2024-06-18', end_date: '2024-06-20' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('near_earth_objects');
  });

  it('should return 400 if no dates are provided', async () => {
    const response = await request(server).get('/api/asteroids');

    expect(response.statusCode).toBeGreaterThanOrEqual(400);
  });
});
