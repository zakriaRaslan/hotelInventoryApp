import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hInv-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss']
})
export class RoomBookingComponent implements OnInit {

  constructor(private router:ActivatedRoute){
  }
id:number=0;

id$ = this.router.paramMap.pipe(map((params)=> params.get('roomId')));

  ngOnInit(): void {
      // this.router.params.subscribe((param)=>{this.id= param['roomId']});
      // this.id = this.router.snapshot.params['roomId'];
      // this.router.paramMap.subscribe((param)=>{param.get('roomId')});
  }
}
