import { Component, OnInit } from '@angular/core';
import { ChefService } from 'src/app/services/chefs.service';
import { MatDialog } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { ChefsDialogComponent } from '../forms/chefs-update-dialog/chefs-dialog.component';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss']
})
export class ChefsComponent implements OnInit {
  editing = false;
  displayedColumns: string[] = ['name', 'description', 'image', 'weekChef', 'action'];
  dataSource: any[] = [];

  constructor(private chefService: ChefService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getChefs();
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

  updateRow(index: number) {
    const element = this.dataSource[index];
    const body = {
      name: element.name,
      image: element.image,
      description: element.description,
      weekChef: element.weekChef
    };
    this.chefService.updateChefById(element._id, body);
  }

  openUpdateDialog(element: any, _tableName: string, _method: string): void {
    const dialogRef = this.dialog.open(ChefsDialogComponent, {
      width: '500px',
      data: { element: JSON.parse(JSON.stringify(element)), tableName: _tableName, method: _method }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      let body = {
        name: result.name,
        image: result.image,
        description: result.description,
        weekChef: result.weekChef
      };
      console.log(1, body.weekChef);
      this.chefService.updateChefById(element._id, body);
    });
  }

  openCreateDialog() {
    const element: any = {
      name: '',
      image: '',
      description: '',
      weekChef: false
    };
    const dialogRef = this.dialog.open(ChefsDialogComponent, {
      width: '500px',
      data: { element: element, tableName: 'chefs', method: 'Create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(1, 'The dialog was closed and the result:', result);
      let body = {
        name: element.name,
        image: element.image,
        description: element.description,
        weekChef: element.weekChef
      };
      this.chefService.createChef(body);
    });
  }

  deleteRowFromDB(index: number) {
    const element = this.dataSource[index];
    this.chefService.deleteChefById(element._id);
    this.dataSource[index].delete();
  }

  cancelRow(row: any) {

  }
}

