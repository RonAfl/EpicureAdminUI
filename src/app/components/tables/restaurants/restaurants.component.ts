import { Component, OnInit } from '@angular/core';
import { RestaurantService, RestaurantsType } from 'src/app/services/restaurants.service';
import { MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { RestaurantsDialogComponent } from '../forms/restaurants-update-dialog/restaurants-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  editing = false;
  displayedColumns: string[] = ['name', 'chef', 'image', 'stars', 'action'];
  dataSource: any[] = [];

  constructor(private restaurantService: RestaurantService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getRestaurants();
    this.changeDetectorRef.markForCheck();

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




  // updateRow(index: number) {
  //   const element = this.dataSource[index];
  //   const body = {
  //     name: element.name,
  //     chef: element.chef,
  //     image: element.image,
  //     stars: element.stars
  //   };
  //   const token : string = <string>localStorage.getItem('admin');
  //   this.restaurantService.updateRestaurantById(element._id, body, token);
  // }

  openUpdateDialog(element: any, _tableName: string, _method: string): void {
    if (localStorage.getItem('isSuper') === '1') {
      const dialogRef = this.dialog.open(RestaurantsDialogComponent, {
        width: '500px',
        data: { element: element, tableName: _tableName, method: _method }
      });


      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result.method !== 'cancel') {
          let body = {
            name: <string>result.element.name,
            chef: <string>result.element.chef.id,
            image: <string>result.element.image,
            stars: <string>result.element.stars
          };
          //console.log(body.chef);
          const token : string = <string>localStorage.getItem('admin');
          this.restaurantService.updateRestaurantById(element._id, body, token);
          this.getRestaurants();
          this.changeDetectorRef.detectChanges();
        }

      }
      );
    }
  }

  openCreateDialog() {
    const element: any = {
      name: '',
      image: '',
      chef: '',
      stars: ''
    };
    if (localStorage.getItem('isSuper') === '1') {
      const dialogRef = this.dialog.open(RestaurantsDialogComponent, {
        width: '500px',
        data: { element: element, tableName: 'Restaurants', method: 'Create' }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(1, 'The dialog was closed and the result:', result);
        if (result.method !== 'cancel') {
          
          const token: string = <string>localStorage.getItem('admin');
          let body = {
            name: <string>result.element.name,
            image: <string>result.element.image,
            chef: <string>result.element.chef.id,
            stars: <string>result.element.stars
          };

          this.restaurantService.createRestaurant(body, token)
            .subscribe(newRestaurant => {
              console.log(2, newRestaurant);
              let newData = { ...newRestaurant, action: '', editing: false }
              this.dataSource = [...this.dataSource, newData];
              this.getRestaurants();
              this.changeDetectorRef.detectChanges();

            });
        }
      });
    }
  }

  deleteRowFromDB(index: number, name: string) {
    const element = this.dataSource[index];
    const token:string = <string>localStorage.getItem('admin');
    this.restaurantService.deleteRestaurantById(element._id, token);
    console.log(element._id)
    this.dataSource = this.dataSource.filter((element) => element.name !== name);
    this.changeDetectorRef.detectChanges();
  }

  cancelRow(row: any) {

  }
}
