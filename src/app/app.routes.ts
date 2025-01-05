import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExecutiveComponent } from './pages/executive/executive.component';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'executive', component: ExecutiveComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
];
