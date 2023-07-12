import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomBookingComponent,
    RoomAddComponent,
  ],
  imports: [CommonModule, RoomsRoutingModule, FormsModule,],
})
export class RoomsModule {}
