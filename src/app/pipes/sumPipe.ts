import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(array: any[], property: string): number {
    return array.reduce((sum, item) => sum + (item[property] || 0), 0);
  }
}
