import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChefService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-restaurants-dialog',
  templateUrl: './restaurants-dialog.component.html',
})

export class RestaurantsDialogComponent implements OnInit {
  chefs: any = [];
  numbers:string[] = ['1', '2', '3', '4', '5'];
  constructor(
    public dialogRef: MatDialogRef<RestaurantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chefsService: ChefService) {

    chefsService.getChefs().subscribe((result) => {
      result.map((res) => {
        this.chefs.push({ name: res.name, id: res._id })
      })
    })


  }
  ngOnInit(): void {
  }

  onUpdate(){

    for(let chef of this.chefs){
      if(chef.name === this.data.element.chef )
      {
        this.data.element.chef = chef;
        this.dialogRef.close(this.data);
      }
    }

    return;
  }
  onNoClick(): void {
    this.data.method = 'cancel';
    this.dialogRef.close(this.data);
  }
}
