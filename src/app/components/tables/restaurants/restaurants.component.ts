import { Component, OnInit } from '@angular/core';
import { RestaurantService, RestaurantsType } from 'src/app/services/restaurants.service';
import { MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { RestaurantsDialogComponent } from '../forms/restaurants-update-dialog/restaurants-dialog.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  editing = false;
  displayedColumns: string[] = ['name', 'chef', 'image', 'stars', 'action'];
  dataSource: any[] = [];

  constructor(private restaurantService: RestaurantService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.dataSource = restaurants.map(res => {
        return {
          name: res.name,
          chef: res.chef.name,
          image: res.image,
          stars: res.stars,
          action: '',
          editing: false,
          _id: res._id
        }
      });
    });
  }




  updateRow(index: number) {
    const element = this.dataSource[index];
    const body = {
      name: element.name,
      chef: element.chef,
      image: element.image,
      stars: element.stars
    };
    this.restaurantService.updateRestaurantById(element._id, body);
  }

  openUpdateDialog(element: any, _tableName: string, _method: string): void {
    const dialogRef = this.dialog.open(RestaurantsDialogComponent, {
      width: '500px',
      data: { element: JSON.parse(JSON.stringify(element)), tableName: _tableName, method: _method }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      let body = {
        name: <string>result.name,
        chef: <string>result.chef,
        image: <string>result.image,
        stars: <string>result.stars
      };
      console.log(body.chef);
      this.restaurantService.updateRestaurantById(element._id, body);
    });
  }

  openCreateDialog() {
    const element:any={
      name:'',
      image:'',
      chef:'',
      stars:''
    };
    const dialogRef = this.dialog.open(RestaurantsDialogComponent, {
      width: '500px',
      data: { element:element, tableName: 'Restaurants', method: 'Create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(1, 'The dialog was closed and the result:', result);
      let body = {
        name: <string>result.name,
        image: <string>result.image,
        chef: <string>result.chef,
        stars: <string>result.stars
      };
      this.restaurantService.createRestaurant(body);
    });
  }

  deleteRowFromDB(index: number) {
    const element = this.dataSource[index];
    this.restaurantService.deleteRestaurantById(element._id);
    this.dataSource[index].delete();
    //this.getRestaurants();
    //------>check how to refresh the delete on spot.
  }

  cancelRow(row: any) {

  }
}
