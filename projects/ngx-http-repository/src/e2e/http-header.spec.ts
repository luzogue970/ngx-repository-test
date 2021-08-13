import { HttpHeader, HttpRepository, HttpResource } from '../public-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from '@angular/core';
import { Column, Id, SubQuery } from '@witty-services/ngx-repository';
import { mockResponse } from './util/mock.response.spec';
import { DateConverter } from '@witty-services/ts-serializer';
import { initializeRepository, RepositoryContext } from './util/repository-intializer.spec';

describe('HttpHeader', () => {

  // TODO @RMA patchAll, deleteAll
  // TODO @RMA customRepository
  // TODO @RMA customHttpClient
  let bookType: Type<any>;
  let repository: HttpRepository<any, any>;
  let httpClient: HttpClient;

  beforeEach(() => {
    @HttpResource({
      path: '/books'
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

    const context: RepositoryContext<Book> = initializeRepository(Book);
    repository = context.repository;
    httpClient = context.httpClient;
    bookType = Book;
  });

  [
    ['findOne', (query: any) => repository.findOne(query).toPromise(), {
      method: 'GET',
      path: '/books',
      body: null
    }],
    ['findAll', (query: any) => repository.findAll(query).toPromise(), {
      method: 'GET',
      path: '/books',
      body: null
    }],
    ['findById', (query: any) => repository.findById(1, query).toPromise(), {
      method: 'GET',
      path: '/books/1',
      body: null
    }],
    ['create', (query: any) => repository.create(new bookType(), query).toPromise(), {
      method: 'POST',
      path: '/books',
      body: {}
    }],
    ['update', (query: any) => repository.update(new bookType({ id: 1 }), query).toPromise(), {
      method: 'PUT',
      path: '/books/1',
      body: { id: 1 }
    }],
    ['patch', (query: any) => repository.patch(new bookType({ id: 1 }), query).toPromise(), {
      method: 'PATCH',
      path: '/books/1',
      body: { id: 1 }
    }],
    ['delete', (query: any) => repository.delete(new bookType({ id: 1 }), query).toPromise(), {
      method: 'DELETE',
      path: '/books/1',
      body: { id: 1 }
    }]
  ].forEach(([requestName, invokeRequest, { method, path, body }]: [string, (query: any) => Promise<any>, any]) => {
    describe(requestName, () => {
      it(`should add simple http header`, async () => {
        class BookQuery {

          @HttpHeader()
          public name: string;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const name: string = 'Lord of the Ring 3';
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          name
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, path, {
          params: new HttpParams(),
          headers: {
            name
          },
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add formatted http header`, async () => {
        class BookQuery {

          @HttpHeader({ format: '[:value]' })
          public name: string;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const name: string = 'Lord of the Ring 3';
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          name
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, path, {
          params: new HttpParams(),
          headers: {
            name: `[${ name }]`
          },
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add custom converted http header`, async () => {
        class BookQuery {

          @HttpHeader({ customConverter: () => DateConverter })
          public since: Date;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const since: Date = new Date('2021-01-01T05:51:00.000+0200');
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          since
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, path, {
          params: new HttpParams(),
          headers: {
            since: `2021-01-01T03:51:00.000Z`
          },
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add custom converted http header with name`, async () => {
        class BookQuery {

          @HttpHeader({ customConverter: () => DateConverter, name: 'SINCE' })
          public since: Date;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const since: Date = new Date('2021-01-01T05:51:00.000+0200');
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          since
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, path, {
          params: new HttpParams(),
          headers: {
            SINCE: `2021-01-01T03:51:00.000Z`
          },
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add deep http header`, async () => {
        class SubBookQuery {

          @HttpHeader()
          public name: string;

          public constructor(data: Partial<SubBookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        class BookQuery {

          @SubQuery()
          public child: SubBookQuery;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const name: string = 'Gladiator';
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          child: new SubBookQuery({
            name
          })
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, path, {
          params: new HttpParams(),
          headers: {
            name
          },
          observe: 'response',
          body,
          responseType: 'json'
        });
      });
    });
  });
});
