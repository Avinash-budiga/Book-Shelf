import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  username:string;
  userpath:string;
  currentRoute: string;
  
  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userpath = localStorage.getItem('user');
    this.currentRoute = this.route.snapshot.routeConfig.path;
    this.auth.getUser(this.userpath).subscribe((res)=>{
      this.username = res['username'];
    })
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
        Swal.fire(
          'Logged out Successfully!'
        );
        this.auth.signOutUser();
      } else if(result.isDenied) {}
    });
  }
}