import { Component } from '@angular/core';
import { Person } from '../../model/person';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.html',
  styleUrl: './status.css',
})
export class Status {
  person:Person[]=[];
  totalUsers=0;
  totalBirthdays=0;
  totalAnniversary=0;
  todayBirthday=0;
  todayAnniversary=0;
  upCommingAnniversaries=0;
  upCommingBirthday=0;
  fatherFriends=0;
  motherFriends=0;
  relations=0;
  ngOnInit():void{
    this.person=JSON.parse(localStorage.getItem('people')||'[]');
    this.calculateStatus();
  }
calculateStatus(){

  // reset counts
  this.totalBirthdays = 0;
  this.totalAnniversary = 0;
  this.todayBirthday = 0;
  this.todayAnniversary = 0;
  this.upCommingBirthday = 0;
  this.upCommingAnniversaries = 0;
  this.fatherFriends = 0;
  this.motherFriends = 0;
  this.relations = 0;

  const today = new Date();

  const currentDate = today.getDate();

  const currentMonth = today.toLocaleString('en-US', {
    month: 'long'
  });

  this.totalUsers = this.person.length;

  this.person.forEach(person => {

    // Relations
    if(person.Relation === 'F-Friend'){
      this.fatherFriends++;
    }
    else if(person.Relation === 'M-Friend'){
      this.motherFriends++;
    }
    else if(person.Relation === 'Relation'){
      this.relations++;
    }


    // Birthday
    if(person.DOB){

      this.totalBirthdays++;

      const [day, month] = person.DOB.split(' ');

      if(Number(day) === currentDate && month === currentMonth){
        this.todayBirthday++;
      }

      if(this.isUpComming(day, month)){
        this.upCommingBirthday++;
      }
    }


    // Anniversary
    if(person.Anniversary){

      this.totalAnniversary++;

      const [day, month] = person.Anniversary.split(' ');

      if(Number(day) === currentDate && month === currentMonth){
        this.todayAnniversary++;
      }

      if(this.isUpComming(day, month)){
        this.upCommingAnniversaries++;
      }
    }

  });
}
  // isUpComming(day:string,month:string){
  //   const months=['January','February','March','April','June','July','August',
  //     'September','October','November','December'
  //   ];
  //   const today=new Date();
  //   const eventMonth=months.indexOf(month);
  //   const currentMonth=today.getMonth();
  //   const eventDate=Number(day);
  //   const currentDay=today.getDate();
  //   return(eventMonth>currentMonth || (eventMonth===currentMonth && eventDate>currentDay))
  // };
  isUpComming(day: string, month: string): boolean {

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

  const today = new Date();

  const eventDate = new Date(
    today.getFullYear(),
    months.indexOf(month),
    Number(day)
  );
    today.setHours(0,0,0,0);
  eventDate.setHours(0,0,0,0);
  // If this year's date has already passed, check next year's event
  if (eventDate < today) {
    eventDate.setFullYear(today.getFullYear() + 1);
  }

  // Difference in days
  const diffDays = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays >= 1 && diffDays <= 10;
}
}
