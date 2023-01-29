import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestaurantService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-chefs-dialog',
  templateUrl: './dishes-dialog.component.html',
})

export class DishesDialogComponent {
  restaurants: { name: string, id: string }[] = []
  selectedRest: string = this.data.element.restaurant.name;
  tags: string[] = ['spicy', 'vegan', 'vegi'];
  constructor(
    public dialogRef: MatDialogRef<DishesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restaurantService: RestaurantService) {

    restaurantService.getRestaurants().subscribe((result) => {
      result.map((res) => {
        this.restaurants.push({ name: res.name, id: res._id })
      })
    })
  }

  onCreate() {
    for (let rest of this.restaurants) {
      if (rest.name === this.selectedRest) {
        this.data.element.restaurant = rest;
      }
    }
    this.dialogRef.close(this.data);
  }

  onUpdate() {
    for (let rest of this.restaurants) {
      if (rest.name === this.selectedRest) {
        this.data.element.restaurant = rest;
      }
    }
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.data.method = 'cancel';
    this.dialogRef.close(this.data);
  }
}
