import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { RouterLink } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { AlertifyService } from './services/Alertify.service';
import { AuthServiceService } from './services/AuthService.service';
import { AddLotComponent } from './add-lot/add-lot.component';
import { ListCompteursComponent } from './listCompteurs/listCompteurs.component';


import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { LotsService } from './services/Lots.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { OperationsSurLotComponent } from './operationsSurLot/operationsSurLot.component';
import { ChangementEtalonnageComponent } from './changement-etalonnage/changement-etalonnage.component';



registerLocaleData(fr);


const appRoutes : Routes=[
  {path:'login',component:UserLoginComponent},
  {path:'register', component:UserRegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'addLot', component:AddLotComponent},
  {path:'listCmpt/:id' , component:ListCompteursComponent},
  {path:'operations',component:OperationsSurLotComponent}
]

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [	
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    NavBarComponent,
    HomeComponent,
      AddLotComponent,
      ListCompteursComponent,
      OperationsSurLotComponent,
      ChangementEtalonnageComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzTableModule,
    NzLayoutModule,
    NzMenuModule,
    ScrollingModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzButtonModule,
    NzDividerModule,
    NzInputModule,
    NzSelectModule,
    NzSpaceModule,
    NzFormModule,
    NzCardModule,





  ],
  providers: [

    AlertifyService,
    AuthServiceService,
    LotsService,
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
