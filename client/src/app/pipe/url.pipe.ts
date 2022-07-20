import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {
  url = environment.configUrl;

  transform(value: string | undefined | ArrayBuffer ): string | ArrayBuffer {
    if(!value) return '';
    const image = typeof value === 'string' && /^data:image\.*/.test(value);
    return image ? value : `${this.url}/${value}`;
  }
};
