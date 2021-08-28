import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements AfterViewInit, OnDestroy {

  result = null;
  scanActive = false;
  results = [];
  @Output() scanActiveEmitter = new EventEmitter<boolean>();

  constructor(private alertController: AlertController,
              private toastController: ToastController,
              private clipboard: Clipboard) { }
  
  ngOnDestroy(): void {
    BarcodeScanner.stopScan();
  }
  
  ngAfterViewInit(): void {
    BarcodeScanner.prepare();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async startScanner() {
    const allowed = await this.checkPermission()
    
    if(allowed){
      this.scanActive = true;
      this.scanActiveEmitter.emit(true);
      const result = await BarcodeScanner.startScan();
      if(result.hasContent){
        this.presentToast("Leitura realizada!");
        this.result = result.content;
        this.results.push(result.content);
        this.scanActive = false;
        this.scanActiveEmitter.emit(false);
      }
    }

  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'Atenção!',
          message: 'Realize a liberação para acesso à câmera nas configurações',
          buttons: [{
            text: 'Não',
            role: 'cancel'
          },
          {
            text: 'Abrir configuraçções',
            handler: () => {
              resolve(false);
              BarcodeScanner.openAppSettings();
            }
          }]
        });

        await alert.present();
      }

    })
  }

  stopScanner(){
    BarcodeScanner.stopScan();
    this.scanActive = false;
    this.scanActiveEmitter.emit(false);
  }

  copyItem(t){
    this.clipboard.copy(t);
    this.presentToast("Copiado para area de transferência.");
  }

  removeItem(t){
    this.results.splice(this.results.indexOf(t), 1);
    this.presentToast("Resultado removido.");
  }

}