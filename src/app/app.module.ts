import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RestaurantsComponent } from './components/tables/restaurants/restaurants.component';
import { ChefsComponent } from './components/tables/chefs/chefs.component';
import { DishesComponent } from './components/tables/dishes/dishes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RestaurantService } from './services/restaurants.service';
import { ChefService } from './services/chefs.service';
import { RestaurantsDialogComponent } from './components/tables/forms/restaurants-update-dialog/restaurants-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChefsDialogComponent } from './components/tables/forms/chefs-update-dialog/chefs-dialog.component';
import { DishService } from './services/dishes.service';
import { DishesDialogComponent } from './components/tables/forms/dishes-update-dialog/dishes-dialog.component';
import { UsersService } from './services/users.service';
export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home-admin', component: AdminComponent },
  { path: 'home-admin/restaurants', component: RestaurantsComponent },
  { path: 'home-admin/chefs', component: ChefsComponent },
  { path: 'home-admin/dishes', component: DishesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    SidebarComponent,
    RestaurantsComponent,
    ChefsComponent,
    DishesComponent,
    RestaurantsDialogComponent,
    ChefsDialogComponent,
    DishesDialogComponent
  ],
  entryComponents: [
    RestaurantsDialogComponent,
    ChefsDialogComponent,
    DishesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [RestaurantService, ChefService, DishService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class RestaurantsDialogModule { }
export class ChefsDialogModule { }
export class DishesDialogModule { }
