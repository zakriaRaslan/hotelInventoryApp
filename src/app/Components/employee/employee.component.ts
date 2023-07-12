import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/room-services/rooms.service';

@Component({
  selector: 'hInv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // providers:[RoomsService]
})
export class EmployeeComponent {
empName:string="Mohsen";
// constructor(@Self() private roomsService:RoomsService){}
}
