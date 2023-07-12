import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './Components/container/container.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { App_Config, App_Service_Config } from './AppConfig/appConfig.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './Interceptors/request.interceptor';
import { InitService } from './services/init.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HoverDirective } from './Directives/hover/hover.directive';
import { EmailValidatorDirective } from './Directives/hover/emailValidator/email-validator.directive';
// import{RoomsModule} from '../app/Components/rooms/rooms.module'
import { HeaderModule } from './Components/header/header.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from './errorhandler.service';

function initFactory(initServics: InitService) {
  return () => initServics.init();
}

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    NavBarComponent,
    NotfoundComponent,
    LoginComponent,
    HoverDirective,
    EmailValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HeaderModule,
    // RoomsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: App_Service_Config,
      useValue: App_Config,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [InitService],
      multi: true,
    },
    { provide: ErrorHandler,
     useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
