import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserDetailPageComponent} from './components/user-detail-page/user-detail-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path : 'user/:id', component: UserDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
