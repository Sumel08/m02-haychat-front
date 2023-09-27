import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo([''])
    }
  }, {
    path: '',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login'])
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
