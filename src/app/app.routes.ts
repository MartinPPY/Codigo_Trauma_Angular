import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Admin } from './admin/admin';
import { Dashboard } from './admin/dashboard/dashboard';
import { Medic } from './medic/medic';
import { Form } from './medic/form/form';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: Auth,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Login },
            { path: 'register', component: Register }
        ]
    },
    {
        path: 'admin',
        component: Admin,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard }
        ]
    },
    {
        path: 'medic',
        component: Medic,
        children: [
            { path: '', redirectTo: 'form', pathMatch: 'full' },
            { path: 'form', component: Form }
        ]
    },
    {
        path: '**',
        component: NotFound
    }

];
