import { Component, OnInit } from '@angular/core';
import { ChefService } from 'src/app/services/chefs.service';
import { MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { ChefsDialogComponent } from '../forms/chefs-update-dialog/chefs-dialog.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss']
})
export class ChefsComponent implements OnInit {
  editing = false;
  displayedColumns: string[] = ['name', 'description', 'image', 'weekChef', 'action'];
  dataSource: any[] = [];

  constructor(private chefService: ChefService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getChefs();
    this.changeDetectorRef.markForCheck();
  }

  getChefs() {
    this.chefService.getChefs().subscribe(chefs => {
      this.dataSource = chefs.map(res => {
        return {
          name: res.name,
          image: res.image,
          description: res.description,
          action: '',
          weekChef: res.weekChef,
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
  //     image: element.image,
  //     description: element.description,
  //     weekChef: element.weekChef
  //   };
  //   this.chefService.updateChefById(element._id, body);
  //   this.getChefs();
  // }

  openUpdateDialog(element: any, _tableName: string, _method: string): void {
    if (localStorage.getItem('isSuper') === '1') {

      const dialogRef = this.dialog.open(ChefsDialogComponent, {
        width: '500px',
        data: { element: element, tableName: _tableName, method: _method }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result.method !== 'cancel') {
          const token: string = <string>localStorage.getItem('admin');
          let body = {
            name: result.element.name,
            image: result.element.image,
            description: result.element.description,
            weekChef: result.element.weekChef
          };
          console.log(1, body.weekChef);
          this.chefService.updateChefById(element._id, body, token);
          this.getChefs();
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

  openCreateDialog() {
    const element: any = {
      name: '',
      image: '',
      description: '',
      weekChef: false
    };
    if (localStorage.getItem('isSuper') === '1') {

      const dialogRef = this.dialog.open(ChefsDialogComponent, {
        width: '500px',
        data: { element: element, tableName: 'chefs', method: 'Create' }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(1, 'The dialog was closed and the result:', result);
        if (result.method !== 'cancel') {
          const token: string = <string>localStorage.getItem('admin');
          let body = {
            name: element.name,
            image: element.image,
            description: element.description,
            weekChef: element.weekChef
          };
          this.chefService.createChef(body, token)
            .subscribe(newChef => {
              console.log(2, newChef);
              let newData = { ...newChef, action: '', editing: false }
              this.dataSource = [...this.dataSource, newData];
              this.getChefs();
              this.changeDetectorRef.detectChanges();
            });
        }
      }
      );
    }
  }

  deleteRowFromDB(index: number, name: string) {
    const token: string = <string>localStorage.getItem('admin');
    const element = this.dataSource[index];
    this.chefService.deleteChefById(element._id, token);
    this.dataSource = this.dataSource.filter((element) => element.name !== name);
    this.changeDetectorRef.detectChanges();
  }

  cancelRow(row: any) {

  }
}

