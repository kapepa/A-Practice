import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  const pipe = new UrlPipe();

  it('should return new url', () => {
    expect(pipe.transform('image')).toBe('http://127.0.0.1:5000/image');
  });

  it('should return string', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return ArrayBuffer', () => {
    expect(pipe.transform("data:image:picture")).toBe('data:image:picture');
  });
});
