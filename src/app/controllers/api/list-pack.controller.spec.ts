// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { ListPackController } from './list-pack.controller';

describe('ListPackController', () => {

  let controller: ListPackController;

  beforeEach(() => controller = createController(ListPackController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ListPackController, 'foo'), 'GET');
      strictEqual(getPath(ListPackController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
