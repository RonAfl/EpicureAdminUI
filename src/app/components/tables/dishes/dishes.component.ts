import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishService } from 'src/app/services/dishes.service';
import { DishesDialogComponent } from '../forms/dishes-update-dialog/dishes-dialog.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  editing = false;
  displayedColumns: string[] = ['name', 'ingredients', 'image', 'price', 'tags', 'restaurant', 'action'];
  dataSource: any[] = [];

  constructor(private dishService: DishService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getDishes();
    this.changeDetectorRef.markForCheck();

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

  // updateRow(index: number) {
  //   const element = this.dataSource[index];
  //   const body = {
  //     name: element.name,
  //     image: element.image,
  //     ingredients: element.ingredients,
  //     price: element.price,
  //     tags: element.tags,
  //     restaurant: element.restaurant,
  //   };
  //   this.dishService.updateDishById(element._id, body);
  // }

  openUpdateDialog(element: any, _tableName: string, _method: string): void {
    if (localStorage.getItem('isSuper') === '1') {

      const dialogRef = this.dialog.open(DishesDialogComponent, {
        width: '500px',
        data: { element: element, tableName: _tableName, method: _method }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result.restaurant);
        if (result.method !== 'cancel') {
          const token: string = <string>localStorage.getItem('admin');
          let body = {
            _id: result.element._id,
            name: result.element.name,
            image: result.element.image,
            ingredients: result.element.ingredients,
            price: result.element.price,
            tags: result.element.tags,
            restaurant: result.element.restaurant.id,
          };
          //   console.log(10, body);
          this.dishService.updateDishById(element._id, body, token);
          this.getDishes();
          this.changeDetectorRef.detectChanges();
        }
      });
    }
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
    if (localStorage.getItem('isSuper') === '1') {

      const dialogRef = this.dialog.open(DishesDialogComponent, {
        width: '500px',
        data: { element: element, tableName: 'dishes', method: 'Create' }
      });

      dialogRef.afterClosed().subscribe(result => {
        const token: string = <string>localStorage.getItem('admin');
        console.log(1, 'The dialog was closed and the result:', result);
        if (result.method !== 'cancel') {
          let body = {
            name: result.element.name,
            image: result.element.image,
            ingredients: result.element.ingredients,
            price: result.element.price,
            tags: result.element.tags,
            restaurant: result.element.restaurant.id,
          };
          console.log(body);
          this.dishService.createDish(body, token)
            .subscribe(newDish => {
              console.log(2, newDish);
              let newData = { ...newDish, action: '', editing: false }
              this.dataSource = [...this.dataSource, newData];
              this.getDishes();
              this.changeDetectorRef.detectChanges();
            });
        }

      });
    }
  }

  deleteRowFromDB(index: number, name: string) {
    if (localStorage.getItem('admin')) {
      const token: string = <string>localStorage.getItem('admin');
      const element = this.dataSource[index];
      this.dishService.deleteDishById(element._id, token);
      this.dataSource = this.dataSource.filter((element) => element.name !== name);
      this.changeDetectorRef.detectChanges();
    }
  }
  
  cancelRow(row: any) {

  }
}

