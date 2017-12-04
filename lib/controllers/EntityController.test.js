process.env.NODE_ENV = 'test';
const HttpMock = require('node-mocks-http');
const Boom = require('boom');
const EntityController = require('./EntityController');

describe('EntityController', () => {
    const entityService = {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    };
    const entityController = new EntityController({
        entityName: 'Entity',
        entityService
    });

    describe('create', () => {
        it('should respond with HTTP status 200 and the created entity', async() => {
            const inputEntity = {
                name: 'Some name',
                description: 'Some description'
            };

            const expectedEntity = Object.assign({}, inputEntity, { id: 1 });
            const request = HttpMock.createRequest({ body: inputEntity });
            const response = HttpMock.createResponse();
            entityService.create.mockReturnValueOnce(Promise.resolve(expectedEntity));


            await entityController.create(request, response, () => {});
            const actualEntity = JSON.parse(response._getData());
            expect(actualEntity).toEqual(expectedEntity);
            expect(response._isJSON()).toBe(true);
            expect(response._getStatusCode()).toBe(201);

        });

    });
    describe('getAll', () => {
        it('should respond with 200 status code', async() => {
            const expectedEntity = [{ objects: 'This' }];
            const request = HttpMock.createRequest();
            const response = HttpMock.createResponse();
            entityService
                .getAll
                .mockReturnValueOnce(Promise.resolve(expectedEntity));
            await entityController.getAll(request, response, () => {});
            const actualEntity = JSON.parse(response._getData());
            expect(actualEntity).toEqual(expectedEntity);

        });
    });
    describe('getById', () => {
        it('should respond with 200 and id', async() => {
            const inputEntity = 1;
            const expectedEntity = [{ id: 1 }];
            const request = HttpMock.createRequest({ query: inputEntity });
            const response = HttpMock.createResponse();
            entityService
                .getById
                .mockReturnValueOnce(Promise.resolve(expectedEntity));
            await entityController.getById(request, response, () => {});
            const actualEntity = JSON.parse(response._getData());
            console.log(actualEntity, 'GETBYID')
            expect(actualEntity).toEqual(expectedEntity);
            expect(response._getStatusCode()).toBe(200);
        });
    });
    describe('update', () => {
        it('should respond with 200 and id', async() => {
            const inputEntity = 1;
            const expectedEntity = [{ id: 1 }];
            const request = HttpMock.createRequest({ query: inputEntity });
            const response = HttpMock.createResponse();
            entityService
                .update
                .mockReturnValueOnce(Promise.resolve(expectedEntity));
            await entityController.update(request, response, () => {});
            const actualEntity = JSON.parse(response._getData());
            expect(actualEntity).toEqual(expectedEntity);

        });
    });
    describe('delete', () => {
        it('should respond with 200 and id', async() => {
            const inputEntity = 1;
            const expectedEntity = [{ id: 1 }];
            const request = HttpMock.createRequest({ query: inputEntity });
            const response = HttpMock.createResponse();
            entityService
                .delete
                .mockReturnValueOnce(Promise.resolve(expectedEntity));
            await entityController.delete(request, response, () => {});
            const actualEntity = JSON.parse(response._getData());
            expect(actualEntity).toEqual(expectedEntity);

        });
    });
});