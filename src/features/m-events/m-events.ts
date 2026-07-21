import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Person } from '../../model/person';

@Component({
  selector: 'app-m-events',
  imports: [CommonModule],
  templateUrl: './m-events.html',
  styleUrl: './m-events.css',
})
export class MEvents {
  birthdayToday:Person[]=[];
  anniversaryToday:Person[]=[];
  people:Person[]=[];
  todayDate=new Date();
  ngOnInit(){
    const data=localStorage.getItem('people')
      if(data){
        this.people=JSON.parse(data);
      }
      this.loadTodayEvents();
  }
  loadTodayEvents(){
    const today=new Date();
    // const todayDate=today.toLocaleDateString('en-GB',{
    //   day:'numeric',
    //   month:'long'
    // });
    const todayDate=today.getDate();
    const todaymonth=today.getMonth();
    this.anniversaryToday=this.people.filter(p=>{if(!p.Anniversary)return false;
      const anniversary=this.convertDate(p.Anniversary);
      return((p.Relation === 'Relation' || p.Relation === 'M-Friend')&&anniversary.getDate()===todayDate && anniversary.getMonth()===todaymonth);
    });
    this.birthdayToday=this.people.filter(p=>{if(!p.DOB)return false;
      const dob=this.convertDate(p.DOB);
      return( (p.Relation === 'Relation' || p.Relation === 'M-Friend') && dob.getDate()===todayDate && dob.getMonth()===todaymonth);
    });
  }
   convertDate(value:string):Date{

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];


    const [day, month] = value.split(' ');


    return new Date(
      new Date().getFullYear(),
      months.indexOf(month),
      Number(day)
    );

  }

}
