import { Component } from '@angular/core';
import { RoomList } from '../room';
import { RoomsService } from '../room-services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hInv-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent {
  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    rating: 0,
  };
  successMessage: string = '';
  constructor(private roomService: RoomsService) {}

  addRoom(roomForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'The Room Added Successfully';
      // roomForm.reset();
      roomForm.resetForm({
        roomType: '',
        amenities: '',
        price: 0,
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        rating: 0,
      });
    });
  }
}
