import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular'
import { HomeComponent } from "./home.component";
import { HomeRouting } from './home-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeRouting
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}