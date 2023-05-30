import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/auth/store/auth.actions';
import { getUserId } from 'src/app/auth/store/auth.selectors';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string;
  userpath: string;
  currentRoute: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.select(getUserId).subscribe((data) => {
      this.auth.getUser(data).subscribe((name) => {
        this.username = name.username;
      });
    });
    this.currentRoute = this.route.snapshot.routeConfig.path;
  }

  //user logout:
  logout() {
    Swal.fire({
      title: 'Are you sure want ot logout?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Logged out Successfully!');
        this.store.dispatch(logOut());
      } else if (result.isDenied) {
      }
    });
  }
}
