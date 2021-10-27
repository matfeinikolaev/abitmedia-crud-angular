import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./home.component";
import { HomeRouting } from './home-routing.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeRouting
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule {}