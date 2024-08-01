import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.authService.user.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  viewUser(user: User | null): void {
    if (user) {
      this.dialog.open(UserDetailComponent, {
        width: '300px',
        data: user
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
