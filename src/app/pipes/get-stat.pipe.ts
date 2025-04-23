import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Pipe({
  name: 'getStat',
  standalone: false
})
export class GetStatPipe implements PipeTransform {

  transform(value: Pokemon, nameStat): number {
    const stat = value.stats.find(s => s.stat.name === nameStat);
    if (stat) {
      return stat.base_stat;
    }
    return 0;
  }

}
