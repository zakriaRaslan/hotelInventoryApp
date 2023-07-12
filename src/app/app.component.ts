import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  OnInit,
  ElementRef,
  Optional,
  Inject,
} from '@angular/core';
import { RoomsComponent } from './Components/rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './services/init.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hInv-root',
  templateUrl: './app.component.html',
  // template: "<h1>Hello World</h1>",
  styleUrls: ['./app.component.scss'],
  // styles:["h1{color:red}"],
})
export class AppComponent implements OnInit {
  title: string = 'hotelInventoryApp';
  role: string = 'Admin';

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((data) => {
        console.log('Navigation Started');
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => {
        console.log('Navigation End');
      });
    this.loggerService?.log('From Logger Service');
    this.name.nativeElement.innerText = 'Hilton Hotel';
    this.localStorage.setItem('name', 'Hilton Hotel');
    // console.log(this.name);
  }

  // @ViewChild('user', { read: ViewContainerRef }) Vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const viewContainer = this.Vcr.createComponent(RoomsComponent);
  //   viewContainer.instance.roomsNumber=20;
  // }
}
