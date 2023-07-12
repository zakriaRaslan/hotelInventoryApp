import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import { IsLoggedInGuard } from './guards/isLoggedIn.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employee',
    loadChildren: () =>
      import('./Components/employee/employee.module').then(
        (mod) => mod.EmployeeModule
      ),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./Components/rooms/rooms.module').then((mod) => mod.RoomsModule),
    // canActivate: [IsLoggedInGuard],
    // canLoad: [IsLoggedInGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'booking/:roomId',
    loadChildren: () =>
      import('./Components/rooms/booking/booking.module').then(
        (mod) => mod.BookingModule
      ),
    // canActivate: [IsLoggedInGuard],
  },
  {
    path: 'noAccess',
    loadChildren: () =>
      import('./Components/no-access/no-access.module').then(
        (m) => m.NoAccessModule
      ),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
