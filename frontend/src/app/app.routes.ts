import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ChatComponent } from './pages/chat/chat';
import { SalesComponent } from './pages/sales/sales';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
  path: 'sales',
  component: SalesComponent
  },
  {
  path: 'chat',
  component: ChatComponent
  }
];