import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { NotImplementedException } from "@nestjs/common";
import * as fs from "fs";

describe('FileService', () => {
  let service: FileService;

  let mockFs = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('writeFile()', () => {
    let file = {
      fieldname: 'image',
      originalname: 'e1e30786-54d4-447a-a3d9-649f10b9818f.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: '<Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 09 06 07 10 12 12 15 12 12 12 15 15 15 16 10 15 16 15 15 17 10 0f 16 15 18 ... 7883 more bytes>',
      size: 7933
    } as any

    it('should be success write file', async () => {
      try {
        jest.spyOn(fs, 'writeFileSync').mockImplementation((path, data, cb) => {
          expect(data).toEqual(file.buffer);
        });

        await service.writeFile(file);
      } catch (err) {
        expect(err).toBeInstanceOf(NotImplementedException);
      }
    })

    it('should be return NotImplementedException',async () => {
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new NotImplementedException() } );
      try {
        await service.writeFile(file);
      } catch (err) {
        expect(err).toBeInstanceOf(NotImplementedException)
      }
    })
  })

  describe('deleteFile()', () => {
    it('should be success delete file', async () => {
      jest.spyOn(fs,'existsSync').mockImplementation(() => true);
      jest.spyOn(fs, 'unlinkSync').mockImplementation(async () => Promise.resolve(true));

      try {
        let del = await service.deleteFile('e1e30786-54d4-447a-a3d9-649f10b9818f.jpg');
        expect(del).toBeTruthy()
      } catch (err) {
        expect(err).toBeInstanceOf(NotImplementedException);
      }
    })

    it('should be return false such file not found', async () => {
      jest.spyOn(fs,'existsSync').mockImplementation(() => false);
      try {
        let del = await service.deleteFile('e1e30786-54d4-447a-a3d9-649f10b9818f.jpg');
        expect(del).toBeFalsy();
      } catch (err) {
        expect(err).toBeInstanceOf(NotImplementedException);
      }
    })

    it('should be return NotImplementedException', async () => {
      jest.spyOn(service, 'deleteFile').mockImplementation(() => { throw new NotImplementedException() })
      try {
        let del = await service.deleteFile('e1e30786-54d4-447a-a3d9-649f10b9818f.jpg');
      } catch (err) {
        expect(err).toBeInstanceOf(NotImplementedException);
      }
    })
  })


});
