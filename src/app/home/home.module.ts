import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ScannerComponent } from '../scanner/scanner.component';
import { GenerateComponent } from '../generate/generate.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ScannerComponent, GenerateComponent],
  providers: [Clipboard]
})
export class HomePageModule {}
