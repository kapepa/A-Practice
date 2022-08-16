import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  const pipe = new UrlPipe();

  it('create an instance', () => {
    expect(pipe.transform('image')).toBe('http://127.0.0.1:5000/image');
  });
});
