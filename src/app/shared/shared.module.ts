import  { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent} from './components/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpService} from '../shared/services/http.service';
import { ProjectSummaryComponent } from '../shared/components/project-summary/project-summary.component';
import { ProjectSummaryService} from './components/project-summary/project-summary.service';



@NgModule({

    declarations : [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ProjectSummaryComponent,

    ],
    imports :[CommonModule],
    exports: [
        HeaderComponent,
        FooterComponent,
        ProjectSummaryComponent
    ],
    providers:[HttpService,ProjectSummaryService]

})

export class SharedModule{
    
}