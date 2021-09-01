import { HttpResource } from '../public-api';
import { Column, Id, Page } from '@witty-services/ngx-repository';
import { HttpRequestContext, testHttpRepository } from './util/test-http-repository.spec';

describe('Column', () => {

  describe('should serialize column', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      @Column()
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: 1, name: 'Book 1' }), new Book({ id: 2, name: 'Book 2' })]),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findOne: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, name: 'Book 1' }),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findById: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, name: 'Book 1' }),
        mockedResponseBody: { id: 1, name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      }
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should change name of serialized column`);
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should override serialize null`);
      it(`should override serialize undefined`);
      it(`should override deserialize null`);
      it(`should override deserialize undefined`);
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should submit only non readonly column`);
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should fetch only non write only column`);
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should use custom converter`);
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      it(`should serialize sub types`);
    });
  });
});
