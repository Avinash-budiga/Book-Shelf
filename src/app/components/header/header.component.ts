import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  currentRoute: string;
  constructor(private auth:AuthService, private route: ActivatedRoute){}

  ngOnInit() {
    this.currentRoute = this.route.snapshot.routeConfig.path;
  }

  logout(){
    Swal.fire("Are you sure want to logout");
    
    this.auth.SignOutUser();
  }

}
