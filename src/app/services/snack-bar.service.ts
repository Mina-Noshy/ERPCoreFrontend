import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService 
{

  constructor(private snackBar: MatSnackBar) { }

  show(msg:string, btn:string)
  {
    this.snackBar.open(msg, btn, 
    {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 10 * 1000
    });
  }
}
