// eslint-disable-next-line object-curly-newline
import { beforeEach, describe, expect, jest } from '@jest/globals';
import errorHandler from '../src/error-handler.js';

describe('#errorHanldler', () => {
  let errorTextMock;

  beforeEach(() => {
    errorTextMock = 'errorText';
  });

  it('should log error to console', () => {
    const spy = jest.spyOn(console, 'log');

    errorHandler(errorTextMock);

    expect(spy).toHaveBeenCalledWith(errorTextMock);
  });
});
