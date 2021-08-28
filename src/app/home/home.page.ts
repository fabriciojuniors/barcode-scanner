import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  scanActive = false;
  segmentActive = "scan";
  constructor(private alertController: AlertController) { }

  segmentChanged(ev : any){
    this.segmentActive = ev.detail.value;
  }

  changeStatus(event){
    this.scanActive = event;
    
  }

}
