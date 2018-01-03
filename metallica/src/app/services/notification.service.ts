import {MatSnackBar} from '@angular/material';
import { Injectable } from '@angular/core';


@Injectable()
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {}
    
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
    }
}