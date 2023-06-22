import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Chart from 'chart.js/auto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit {

  username!: string;
  userDetail : any;
  public chart: any;
  pipe = new DatePipe('en-US');
  changedDate:any = '';
  today = new Date();
  
  constructor(private router : Router, 
    private apiServices: ApiService,
    private route : ActivatedRoute ) { } 

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
          this.username = params['id'];
          this.getInfoUser(this.username);
          console.log("username",this.username);
    });
  }

  getInfoUser(userName:string){
    this.apiServices.getUser(userName).subscribe({
      complete : () => {console.log("success!"); },
      error:() => { alert("error ! search again");},
      next : (data : any = []) => {
        this.userDetail = data;
        this.createChartFollowing(this.userDetail);
        console.log(this.userDetail.followers);
      }
     });
  }

  createChartFollowing(userData:any){ 
    let dateCreatedUser = this.pipe.transform(userData.created_at, 'dd/MM/YYYY');
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    console.log(this.changedDate);

    this.chart = new Chart("MyChart", {
      type: 'line', 
      data: {
        labels: [dateCreatedUser,ChangedFormat], 
	       datasets: [
          {
            label: "Seguidores",
            data: ['0',userData.followers],
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  blackRouter(userName:string){
    this.router.navigate(['home'], { queryParams: { userName: userName }});
  }

}
