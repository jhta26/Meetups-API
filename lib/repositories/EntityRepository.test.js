process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const EntityRepository = require('./EntityRepository');

describe('EntityRepository', () => {
  const database = knex({ client: 'pg' });
  let entityRepository = null;
  let knexTracker = null;

  beforeAll(() => {
    KnexMock.mock(database);
    entityRepository = new EntityRepository({
      entityName: 'entity',
      database
    });
  });
  beforeEach(() => {
    knexTracker = KnexMock.getTracker();
    knexTracker.install();
  });

  describe('getAll', () => {
    it('gets all', async () => {
      const expected = [{ id: 1 }, { id: 2 }];
      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('select');
        query.response(expected);
      });
      const actual = await entityRepository.getAll();
      expect(actual).toEqual(expected);
    });
    it('handles errors', async () => {
      let actual;
      let expected;
      try {
        expected = new Error('Error');
        knexTracker.on('query', (query, step) => {
          expect(query.method).toBe('select');
          query.reject(expected);
        });
        actual = await entityRepository.getAll();
      } catch (error) {
        expect(error.message).toEqual(expected.message);
      }
    });
  });

  describe('getById', () => {
    it('gets by id', async () => {
      const input = 2;
      const expected = { object: 2 };
      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('select');
        query.response([expected]);
      });
      const actual = await entityRepository.getById(input);
      expect(actual).toEqual(expected);
    });
    it('handles errors', async () => {
      let actual;
      let expected;
      try {
        const input = 2;
        expected = new Error('Error');
        knexTracker.on('query', (query, step) => {
          expect(query.method).toBe('select');
          query.reject(expected);
        });
        actual = await entityRepository.getById(input);
      } catch (error) {
        expect(error.message).toEqual(expected.message);
      }
    });
  });
  describe('find by attribute', async () => {
    it('finds object by attribute', async () => {
      const attName = 'user_id';
      const attValue = 1;
      const expected = {
        name: 'Jason Hsu',
        email: 'hsujasonf@gmail.com',
        username: 'Jasonhsu',
        hashed_password:
          '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        role: 'ROLE_STANDARD_USER'
      };
      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('select');
        query.response(expected);
      });
      const actual = await entityRepository.findByAttribute(attName, attValue);
      expect(actual).toEqual(expected);
    });
    it('should handle errors', async () => {
      let actual;
      let expected;
      try {
        const attName = 'user_id';
        const attValue = 1;
        expected = new Error('Error');
        knexTracker.on('query', (query, step) => {
          expect(query.method).toBe('select');
          query.reject(expected);
        });
        actual = await entityRepository.findByAttribute(attName, attValue);
      } catch (error) {
        expect(error.message).toEqual(expected.message);
      }
    });
  });

  describe('update', () => {
    it('updates object', async () => {
      const input = {
        user_id: 1,
        name: '1st period'
      };
      const expected = { object: 1 };
      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('update');
        query.response([expected]);
      });
      const actual = await entityRepository.updateById(1, input);
      expect(actual).toEqual(expected);
    });
    it('handles errors', async () => {
      let actual;
      let expected;
      try {
        const input = 1;
        expected = new Error('Error');
        knexTracker.on('query', (query, step) => {
          expect(query.method).toBe('update');
          query.reject(expected);
        });
        actual = await entityRepository.updateById(1, input);
      } catch (error) {
        expect(error.message).toEqual(expected.message);
      }
    });
  });

  describe('createMethod', async () => {
    it('should end a 200 status', async () => {
      const input = {
        user_id: 1,
        name: 'name'
      };
      const expected = Object.assign({}, input, { id: 1 });
      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('insert');
        query.response([expected]);
      });
      const actual = await entityRepository.create(input);
      expect(actual).toEqual(expected);
    });
    it('should have error messages', async () => {
      let actual;
      let expected;
      try {
        const input = {
          user_id: 1,
          name: 'name'
        };
        expected = new Error('error');
        knexTracker.on('query', (query, step) => {
          expect(query.method).toBe('insert');
          query.reject(expected);
        });
        actual = await entityRepository.create(input);
      } catch (error) {
        expect(error.message).toEqual(expected.message);
      }
    });
  });
  afterEach(() => {
    knexTracker.uninstall();
  });

  afterAll(() => {
    KnexMock.unmock(database);
  });
});
