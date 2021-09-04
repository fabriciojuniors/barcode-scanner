import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {

  conteudo = "";
  showQR = false;
  base64 = "";
  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions) { }

  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    setTimeout(() => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((r1) => {

        if (!r1.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        }
      }, (err) => {
        alert(JSON.stringify(err));
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      })

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((r1) => {

        if (!r1.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        }
      }, (err) => {
        alert(JSON.stringify(err));
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      })
    }, 2000)
  }

  generate() {
    if (this.conteudo.trim() == "") {
      this.presentAlert("Atenção!", "Informe o conteúdo desejado.")
      this.showQR = false;
      return;
    }
    this.showQR = true;
  }

  async downloadQR() {
    let base64 = await this.readAsBase64();
    this.base64ToGallery.base64ToGallery(base64.split(",")[1], { prefix: '_img', mediaScanner: true }).then(
      res => this.presentToast("QRCode salvo com sucesso!" + res),
      err => this.presentToast("Erro ao salvar QRCode. " + err)
    );
  }

  private async readAsBase64() {
    const response = await fetch("https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + this.conteudo);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}