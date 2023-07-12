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
    loadChildren: async () =>
      (await import('./Components/employee/employee.module')).EmployeeModule,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./Components/rooms/rooms.module').then((mod) => mod.RoomsModule),canActivate: [IsLoggedInGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'booking',
    loadChildren: async () =>
      (await import('./Components/booking/booking.module')).BookingModule,canActivate: [IsLoggedInGuard]
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
