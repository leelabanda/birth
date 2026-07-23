import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {


  people: Person[] = [];

  selectedUser = 'Father';


  today = new Date();

  currentMonth = this.today.getMonth();

  currentYear = this.today.getFullYear();



  users = [
    'Father',
    'Mother'
  ];



  months = [
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



  weekDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];



  calendarDays: CalendarDay[] = [];




  ngOnInit() {


    const data = localStorage.getItem('people');


    if(data){

      this.people = JSON.parse(data);

    }



    const username = localStorage.getItem('username');



    if(username === 'Rajendra'){

      this.selectedUser = 'Father';

    }
    else if(username === 'Surekha'){

      this.selectedUser = 'Mother';

    }



    this.generateCalendar();


  }






  get monthName():string {

    return this.months[this.currentMonth];

  }







  generateCalendar(){


    this.calendarDays = [];



    const firstDay = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();



    const totalDays = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();




    for(let i=0;i<firstDay;i++){

      this.calendarDays.push({

        day:0,

        isCurrentMonth:false

      });

    }





    for(let i=1;i<=totalDays;i++){

      this.calendarDays.push({

        day:i,

        isCurrentMonth:true

      });

    }





    while(this.calendarDays.length < 42){

      this.calendarDays.push({

        day:0,

        isCurrentMonth:false

      });

    }


  }








  previousMonth(){


    if(this.currentMonth===0){

      this.currentMonth=11;

      this.currentYear--;

    }
    else{

      this.currentMonth--;

    }


    this.generateCalendar();


  }







  nextMonth(){


    if(this.currentMonth===11){

      this.currentMonth=0;

      this.currentYear++;

    }
    else{

      this.currentMonth++;

    }


    this.generateCalendar();


  }








  // Father/Mother filtering

  get filteredPeople():Person[] {


    if(this.selectedUser === 'Father'){


      return this.people.filter(person =>

        person.Relation === 'Relation'
        ||
        person.Relation === 'F-Friend'

      );


    }





    if(this.selectedUser === 'Mother'){


      return this.people.filter(person =>

        person.Relation === 'Relation'
        ||
        person.Relation === 'M-Friend'

      );


    }



    return this.people;


  }









  hasBirthday(day:number):boolean{


    if(day===0)

      return false;



    return this.getBirthdays(day).length > 0;


  }








  hasAnniversary(day:number):boolean{


    if(day===0)

      return false;



    return this.getAnniversaries(day).length > 0;


  }









  getBirthdays(day:number):Person[]{


    if(day===0)

      return [];



    return this.filteredPeople.filter(person=>{


      if(!person.DOB)

        return false;



      const parts =
      person.DOB.trim().split(' ');



      return (

        Number(parts[0]) === day

        &&

        parts[1].toLowerCase()
        ===
        this.monthName.toLowerCase()

      );


    });


  }









  getAnniversaries(day:number):Person[]{


    if(day===0)

      return [];



    return this.filteredPeople.filter(person=>{


      if(!person.Anniversary)

        return false;



      const parts =
      person.Anniversary.trim().split(' ');



      return (

        Number(parts[0]) === day

        &&

        parts[1].toLowerCase()
        ===
        this.monthName.toLowerCase()

      );


    });


  }









  isToday(day:number):boolean{


    if(day===0)

      return false;



    return (

      day === this.today.getDate()

      &&

      this.currentMonth === this.today.getMonth()

      &&

      this.currentYear === this.today.getFullYear()

    );


  }


}