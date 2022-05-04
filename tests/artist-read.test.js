const { expect } = require('chai');
const request = require('supertest');
const getDB = require('../src/services/db');
const app = require('../src/app');

describe('read artist', () => {
  let db;
  let artists;

  beforeEach(async () => {
    db = await getDB();
    await Promise.all([
      db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        'Tame Impala',
        'Rock',
      ]),
      db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        'Theo Parrish',
        'Deep House',
      ]),
      db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
        'Nas',
        'Hip-hop',
      ]),
    ]);

    [artists] = await db.query(`SELECT * FROM Artist`);
  });

  afterEach(async () => {
    await db.query(`DELETE FROM Artist`);
    await db.close();
  });

  describe('/artist', () => {
    describe('GET', () => {
      it('returns all artist records in the database', async () => {
        const res = await request(app).get('/artist').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((artistRecord) => {
          const expected = artists.find((a) => a.id === artistRecord.id);

          expect(artistRecord).to.deep.equal(expected);
        });
      });
    });
  });
});
