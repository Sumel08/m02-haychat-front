import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  user = this.fireAuth.currentUser;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {}

  async onLogout() {
    await this.fireAuth.signOut();
    await this.router.navigateByUrl('/login');
  }
}
