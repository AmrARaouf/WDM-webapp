import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(isoDateString: string): Date {
    return new Date(isoDateString);
  }

}
