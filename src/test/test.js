const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

const generatePost = () => {
    return { title: faker.internet.userName(), body: faker.lorem.paragraph() };
  };


  describe('test posts endpoint', () => {
    describe('GET ALL', () => {
      it('deberia responder con status 200 y ser array', async () => {
        const res = await request.get('/api/productos');
        expect(res.status).to.eql(200);
        expect(res.body).to.be.a('object');
      });
    });
  });
  
  describe('POST ONE', () => {
    it('deberia incorporar un posteo', async () => {
      const post = generatePost();
      const res = await request.post('/api/productos').send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a('object');
      expect( res.body ).to.include.keys('status', "message");
    });
    
  });
