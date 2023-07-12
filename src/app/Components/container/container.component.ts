import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from 'hotelApi/dist/rooms/rooms.service';

@Component({
  selector: 'hInv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers:[RoomsService],
})
export class ContainerComponent implements AfterContentInit {

@ContentChild(EmployeeComponent) employee!:EmployeeComponent;

constructor(){}

  ngAfterContentInit(): void {
    this.employee.empName="Saeed";
    console.log(this.employee);
  }

}
