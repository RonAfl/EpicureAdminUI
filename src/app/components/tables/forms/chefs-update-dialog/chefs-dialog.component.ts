import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChefService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-chefs-dialog',
  templateUrl: './chefs-dialog.component.html',
})

export class ChefsDialogComponent {
  selectedOption:boolean;
  options = [true, false];
  constructor(
    public dialogRef: MatDialogRef<ChefsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chefsService: ChefService)
     {  
        this.selectedOption = data.element.weekChef;
       
 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
