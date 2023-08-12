import { beforeEach, expect, jest } from '@jest/globals';
import httpRequest from '../src/http-request.js';

describe('#httpRequest', () => {
  let axiosStub;
  let urlMock;

  beforeEach(() => {
    axiosStub = {
      get: () => {},
    };
    urlMock = 'https://test';
  });

  it('client should send get request with correct url', () => {
    const spy = jest.spyOn(axiosStub, 'get');

    httpRequest(urlMock, axiosStub);

    expect(spy).toHaveBeenCalledWith(urlMock);
  });
});
