import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceCharacters'
})
export class ReplaceCharactersPipe implements PipeTransform {

  transform(values: any[], test): any {
    if(test.flagGiftCard != 1) {
      values.map((value) => {
        value.identificador = value.identificador.slice(0, 6) + '*'.repeat(value.identificador.length - 3) + value.identificador.slice(-12)
      })
    }
    return values
  }

}
