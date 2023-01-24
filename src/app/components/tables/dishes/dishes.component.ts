import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishService } from 'src/app/services/dishes.service';
import { DishesDialogComponent } from '../forms/dishes-update-dialog/dishes-dialog.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  editing = false;
  displayedColumns: string[] = ['name', 'ingredients', 'image', 'price', 'tags', 'restaurant', 'action'];
  dataSource: any[] = [];

  constructor(private dishService: DishService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes() {
    this.dishService.getDishes().subscribe(chefs => {
      this.dataSource = chefs.map(res => {
        return {
          _id: res._id,
          name: res.name,
          image: res.image,
          ingredients: res.ingredients,
          price: res.price,
          tags: res.tags,
          restaurant: res.restaurant,
        }
      });
    });
  }

  updateRow(index: number) {
    const element = this.dataSource[index];
    const body = {
      name: element.name,
      image: element.image,
      ingredients: element.ingredients,
      price: element.price,
      tags: element.tags,
      restaurant: element.restaurant,
    };
    this.dishService.updateDishById(element._id, body);
  }

  openUpdateDialog(element: any, _tableName: string, _method: string): void {
    const dialogRef = this.dialog.open(DishesDialogComponent, {
      width: '500px',
      data: { element: JSON.parse(JSON.stringify(element)), tableName: _tableName, method: _method }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result.restaurant);
      let body = {
        _id: result._id,
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        price: result.price,
        tags: result.tags,
        restaurant: result.restaurant,
      };
      console.log(10, body);
      this.dishService.updateDishById(element._id, body);
    });
  }

  openCreateDialog() {
    const element: any = {
      name: '',
      image: '',
      ingredients: '',
      price: 0,
      tags: '',
      restaurant: '',
    };
    const dialogRef = this.dialog.open(DishesDialogComponent, {
      width: '500px',
      data: { element: element, tableName: 'dishes', method: 'Create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(1, 'The dialog was closed and the result:', result);
      let body = {
        name: element.name,
        image: element.image,
        ingredients: element.ingredients,
        price: element.price,
        tags: element.tags,
        restaurant: element.restaurant,
      };
      console.log(body);
      this.dishService.createDish(body);
    });
  }

  deleteRowFromDB(index: number) {
    const element = this.dataSource[index];
    this.dishService.deleteDishById(element._id);
    this.dataSource[index].delete();
  }

  cancelRow(row: any) {

  }
}

