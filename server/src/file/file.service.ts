import {Injectable, NotImplementedException} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as fs from "fs";
import { resolve } from "path";

@Injectable()
export class FileService {

  async writeFile (file: Express.Multer.File ): Promise<string> {
    try {
      const fileName = uuid();
      const folderPath = resolve(__dirname, '..', '..', 'static')
      const fileExtension = file.originalname.split('.').pop();
      const fullNewName = `${fileName}.${fileExtension}`

      if (!fs.existsSync(folderPath)) await fs.mkdirSync(folderPath);
      fs.writeFileSync(resolve(folderPath,fullNewName), file.buffer)

      return fullNewName
    } catch (e) {
      throw new NotImplementedException();
    }
  }

  async deleteFile (file: string): Promise<boolean> {
    try {
      const folderPath = resolve(__dirname, '..', '..', 'static');
      const fullNewName = resolve(folderPath,file);

      if(!fs.existsSync(fullNewName)) return false;

      await fs.unlinkSync(fullNewName);
      return true;
    } catch (e) {
      throw new NotImplementedException();
    }
  }
}
