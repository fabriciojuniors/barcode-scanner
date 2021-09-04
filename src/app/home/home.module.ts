import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ScannerComponent } from '../scanner/scanner.component';
import { GenerateComponent } from '../generate/generate.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ScannerComponent, GenerateComponent],
  providers: [Clipboard, Base64ToGallery, AndroidPermissions]
})
export class HomePageModule {}
