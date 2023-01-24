import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private route: Router){}
  selectedOption: string = '';
  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  showConfirm() {
    const confirmLogout = document.getElementById("confirm-logout");
    if (confirmLogout) {
      confirmLogout.style.display = "block";
    }
  }

  hideConfirm() {
    const confirmLogout = document.getElementById("confirm-logout");
    if (confirmLogout) {
      confirmLogout.style.display = "none";
    }
  }

  logout() {
    this.hideConfirm();
    localStorage.removeItem('log-in');
    this.route.navigateByUrl("login");
  }

  onRestaurantsClicked(){
    this.selectedOption = 'restaurants';
    //this.route.navigateByUrl("home-admin/restaurants");
    console.log(this.selectedOption);

  }

  onChefsClicked(){
    //this.route.navigateByUrl("chefs-table");
    this.selectedOption = 'chefs';
    console.log(this.selectedOption);

  }

  onDishesClicked(){
    //this.route.navigateByUrl("dishes-table");
    this.selectedOption = 'dishes';
    console.log(this.selectedOption);
  }

}
