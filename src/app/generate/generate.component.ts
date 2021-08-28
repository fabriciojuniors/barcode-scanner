import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent implements OnInit {

  conteudo = "";
  showQR = false;
  constructor(private alertController : AlertController,
              private http : HttpClient) { }

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

  ngOnInit() {}

  generate(){
    if(this.conteudo.trim() == ""){
      this.presentAlert("Atenção!", "Informe o conteúdo desejado.")
      this.showQR = false;
      return;
    }
    this.showQR = true;
    /*this.http.get("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=teste").toPromise()
      .then( res => {

      })
      .catch(err => {
        this.presentAlert("Erro!", err.message);
      })*/

  }

}
