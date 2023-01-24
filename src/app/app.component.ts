import { Component } from '@angular/core';
import { Router } from '@angular/router';

import '@material-ui/core/styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EpicureAdminUI';


  constructor(private route:Router){
  }

  ngOnInit(){
    if(localStorage.getItem("log-in")){
      this.route.navigateByUrl("home-admin");
    }
      else{
        this.route.navigateByUrl("/login")
      }
  }
}
