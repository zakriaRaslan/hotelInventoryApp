import {
  Component,
  DoCheck,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  OnDestroy,
  Input,
} from '@angular/core';
import { Room, RoomList } from './room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './room-services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hInv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, OnDestroy
{
  hotelName: string = 'Hilton Hotel';
  roomsNumber: number = 10;
  hiddenRooms: boolean = true;
  selectedRoom!: RoomList;
  title: string = 'Rooms List';
  roomList: RoomList[] = [];
  room: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error("error");
  });

  constructor(private roomsService: RoomsService) {}

  // @ViewChild(HeaderComponent,{static:true}) headerComponent!: HeaderComponent;
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  subscription!: Subscription;
  // rooms$ = this.roomsService.getRooms$;
  priceFilter = new FormControl(0);
  error$ = new Subject<string>();
  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));
  rooms$? = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );
  getError$ = this.error$.asObservable();

  ngOnInit(): void {
    // console.log(this.headerComponent);
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (error) => console.log(error),
    });

    this.stream.subscribe((date) => {
      console.log(date);
    });

    // this.subscription = this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });

    this.roomsService.ngOnInit();

    this.getPhotos();
  }

  ngDoCheck(): void {
    console.log('Do Checked Is Called ');
  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = 'Hilton hotel';
    // console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.last.title = 'Last Header';
  }

  ToggleFunc() {
    this.hiddenRooms = !this.hiddenRooms;
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner , Free Wifi , TV , BathRoom , Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/Ux34Y9hv6dI',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Nov-2021'),
      rating: 7.5,
    };

    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner , Free Wifi , TV , BathRoom , Kitchen',
      price: 500,
      photos: 'https://unsplash.com/photos/Ux34Y9hv6dI',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('11-Nov-2021'),
      rating: 7.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  totalBytes: number = 0;
  getPhotos() {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request Has Been Made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success!..');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });
  }

  ngOnDestroy(): void {
    // if(this.subscription){
    //   this.subscription.unsubscribe;
    // }
  }
}
