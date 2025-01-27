import { AuthGuard } from './guards/auth.guard';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExecutiveComponent } from './pages/executive/executive.component';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotLoggedComponent } from './pages/not-logged/not-logged.component';
import { ReportComponent } from './pages/report/report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditleadComponent } from './pages/editlead/editlead.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'notloggedin', component: NotLoggedComponent },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'executive',
        component: ExecutiveComponent,
        canActivate: [AuthGuard],
        data: { role: 'executive' },
      },
      {
        path: 'carga',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' },
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard],
        data: { role: 'executive' },
      },
      {
        path: 'editlead',
        component: EditleadComponent,
        canActivate: [AuthGuard],
        data: { role: 'executive' },
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
