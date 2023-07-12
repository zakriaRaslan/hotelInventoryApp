import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RoomsComponent } from './rooms.component';
import { ChildRoomGuard } from './guards/child-room.guard';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    canActivateChild: [ChildRoomGuard],
    path: '',
    component: RoomsComponent,
    children: [
      { path: 'add', component: RoomAddComponent },
      // { path: 'booking', component: BookingComponent },
    ],
  },
  // {
  //   path: 'booking/:roomId',
  //   loadChildren: () =>
  //     import('../rooms/booking/booking.module').then(
  //       (mod) => mod.BookingModule
  //     ),
  //   // canActivate: [IsLoggedInGuard],
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
