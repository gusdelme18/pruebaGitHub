import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  searchform!: FormGroup;
  users:any=[];
  displayUserDetailContainer = false;

  constructor(private router : Router, 
                private apiServices: ApiService,
                private formBuilder: FormBuilder,
                private routeActive: ActivatedRoute) { } 
    ngOnInit(): void {

      this.searchform = this.formBuilder.group({
        username: ['', [
              Validators.required, 
              Validators.minLength(4), 
              this.forbiddenValueValidator('doublevpartners')
            ]
        ]
      });

      this.routeActive.queryParamMap
        .subscribe((params) => {
          if(params.get('userName')){
            this.searchform.value.username = params.get('userName');
            this.searchform.controls['username'].setValue(params.get('userName'));
            this.searchUsers();
          }
        }
      );
      
    }

    forbiddenValueValidator(forbiddenValue: string) {
      return (control: FormControl) => {
        const forbidden = control.value.toLowerCase() === forbiddenValue.toLowerCase();
        return forbidden ? { forbiddenValue: true } : null;
      };
    }

    searchUsers(){
       console.log(this.searchform.value.username);
       this.apiServices.searchUser(this.searchform.value.username).subscribe({
        complete : () => {console.log("success!"); this.displayUserDetailContainer = true;},
        error:() => { alert("error ! search again"); this.displayUserDetailContainer = false;},
        next : (data : any = []) => {
          let arrayUsers = data.items.slice(0, 10);
          this.users = arrayUsers;
          console.log(arrayUsers);
        }
       });
       
    }
    sendUser(userName: string){
      console.log(userName);
      this.router.navigate([`/user/${userName}`])

    }

}
