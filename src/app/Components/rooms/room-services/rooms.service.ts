import { Injectable, OnInit, Inject } from '@angular/core';
import { RoomList } from '../room';
import { environment } from '../../../environments/environment';
import { App_Service_Config } from '../../../AppConfig/appConfig.service';
import { appConfig } from 'src/app/AppConfig/appConfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService implements OnInit {
  // roomList: RoomList[] = [
  //   {
  //     roomNumber: 1,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditioner , Free Wifi , TV , BathRoom , Kitchen',
  //     price: 500,
  //     photos: 'https://unsplash.com/photos/Ux34Y9hv6dI',
  //     checkInTime: new Date('11-Nov-2021'),
  //     checkOutTime: new Date('11-Nov-2021'),
  //     rating: 7.5,
  //   },
  //   {
  //     roomNumber: 2,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditioner , Free Wifi , TV , BathRoom , Kitchen',
  //     price: 1500,
  //     photos: 'https://unsplash.com/photos/Ux34Y9hv6dI',
  //     checkInTime: new Date('11-Nov-2021'),
  //     checkOutTime: new Date('11-Nov-2021'),
  //     rating: 8.7,
  //   },
  //   {
  //     roomNumber: 3,
  //     roomType: 'Private Room',
  //     amenities: 'Air Conditioner , Free Wifi , TV , BathRoom , Kitchen',
  //     price: 3000,
  //     photos: 'https://unsplash.com/photos/PJNO2sLlbB8',
  //     checkInTime: new Date('11-Nov-2021'),
  //     checkOutTime: new Date('11-Nov-2021'),
  //     rating: 9.3,
  //   },
  // ];

  roomList: RoomList[] = [];

  constructor(
    @Inject(App_Service_Config) private config: appConfig,
    private http: HttpClient
  ) {
    console.log(config.apiEndPoint);
    console.log('Room Service Initialized....');
  }

  ngOnInit(): void {}
  // hearder = new HttpHeaders({'token':'21315122asadsf'});
  getRooms$ = this.http.get<RoomList[]>('/api/rooms',{
    // headers: this.hearder
  }).pipe(
    shareReplay(1)
  );



  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room:RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room);
  }

  editRoom(room:RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`)
  }

  getPhotos(){
    const request = new HttpRequest('GET',"https://jsonplaceholder.typicode.com/photos",{
      reportProgress:true,
    });
    return this.http.request(request)
  }
}
