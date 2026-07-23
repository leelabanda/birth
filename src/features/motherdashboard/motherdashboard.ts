import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motherdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motherdashboard.html',
  styleUrl: './motherdashboard.css',
})
export class Motherdashboard {

  people: Person[] = [];

  upCommingBirthdays: Person[] = [];

  upCommingAnniversaries: Person[] = [];


  ngOnInit() {

    const data = localStorage.getItem('people');

    if (data) {
      this.people = JSON.parse(data);
    }

    this.loadUpcommingEvents();

  }



  loadUpcommingEvents() {

    const today = new Date();

    today.setHours(0,0,0,0);


    const maxDaysAhead = 10;



    const getTargetDate = (dateStr: string): Date | null => {

      if (!dateStr) {
        return null;
      }


      const eventDate = this.convertDate(dateStr);


      // If date already passed, move to next year

      if (eventDate < today) {

        eventDate.setFullYear(
          today.getFullYear() + 1
        );

      }


      return eventDate;

    };





    // Upcoming Birthdays

    this.upCommingBirthdays = this.people

      .filter(person => {


        const relation = person.Relation?.trim();


        if (
          relation !== 'M-Friend' &&
          relation !== 'Relation'
        ) {
          return false;
        }


        const targetDate = getTargetDate(person.DOB);


        if (!targetDate) {
          return false;
        }


        const diffDays =
          Math.ceil(
            (targetDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
          );


        return diffDays >= 0 &&
               diffDays <= maxDaysAhead;


      })

      .sort((a,b)=>{


        const dateA =
          getTargetDate(a.DOB)!.getTime();


        const dateB =
          getTargetDate(b.DOB)!.getTime();


        return dateA - dateB;


      });







    // Upcoming Anniversaries


    this.upCommingAnniversaries = this.people

      .filter(person => {


        const relation = person.Relation?.trim();


        if (
          relation !== 'M-Friend' &&
          relation !== 'Relation'
        ) {
          return false;
        }


        const targetDate =
          getTargetDate(person.Anniversary);


        if (!targetDate) {
          return false;
        }


        const diffDays =
          Math.ceil(
            (targetDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
          );


        return diffDays >= 0 &&
               diffDays <= maxDaysAhead;


      })

      .sort((a,b)=>{


        const dateA =
          getTargetDate(a.Anniversary)!.getTime();


        const dateB =
          getTargetDate(b.Anniversary)!.getTime();


        return dateA - dateB;


      });


  }







  convertDate(value:string):Date {


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



    const [day, month] =
      value.trim().split(' ');



    const date = new Date(

      new Date().getFullYear(),

      months.indexOf(month),

      Number(day)

    );



    date.setHours(0,0,0,0);


    return date;

  }

}