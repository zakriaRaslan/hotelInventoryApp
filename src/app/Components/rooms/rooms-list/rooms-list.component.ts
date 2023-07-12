import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import { RoomList } from '../room';

@Component({
  selector: 'hInv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit,OnChanges,OnDestroy {
@Input()rooms:RoomList[] | null = [];
@Output() selectedRoom=new EventEmitter<RoomList>();
@Input() title:string='';
constructor(){}

ngOnInit(): void {

}

ngOnChanges(changes: SimpleChanges): void {
console.log(changes);
if(changes['title']){
  this.title=changes['title'].currentValue.toUpperCase();
}
}
  selectRoom(room:RoomList){
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
      console.log('On Destroy Is Run')
  }
}
