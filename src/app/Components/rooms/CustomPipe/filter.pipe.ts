import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from '../room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[] , price:number): RoomList[]{
    return rooms.filter((rooms) => rooms.price >= price);
  }

}
