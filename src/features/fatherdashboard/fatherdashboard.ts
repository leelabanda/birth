import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fatherdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fatherdashboard.html',
  styleUrl: './fatherdashboard.css',
})
export class Fatherdashboard {

  people: Person[] = [];

  upCommingBirthdays: Person[] = [];

  upCommingAnniversaries: Person[] = [];


  ngOnInit() {

    const data = localStorage.getItem('people');

    if (data) {
      this.people = JSON.parse(data);
    }


    this.people.forEach(p => {
      console.log(p.Name, `"${p.Relation}"`);
    });


    this.loadUpcommingEvents();

  }



  loadUpcommingEvents() {

    const today = new Date();

    const next10Days: string[] = [];


    for (let i = 1; i <= 10; i++) {

      const d = new Date(today);

      d.setDate(today.getDate() + i);

      next10Days.push(
        `${d.getDate()}-${d.getMonth()}`
      );

    }



    // Upcoming Birthdays

    this.upCommingBirthdays = this.people
      .filter(person => {

        const relation = person.Relation?.trim();


        if (
          relation !== 'F-Friend' &&
          relation !== 'Relation'
        ) {
          return false;
        }


        if (!person.DOB) {
          return false;
        }


        const dob = this.convertDate(person.DOB);


        return next10Days.includes(
          `${dob.getDate()}-${dob.getMonth()}`
        );

      })
      .sort((a, b) => {

        return this.getNextDate(a.DOB).getTime() -
               this.getNextDate(b.DOB).getTime();

      });




    // Upcoming Anniversaries

    this.upCommingAnniversaries = this.people
      .filter(person => {

        const relation = person.Relation?.trim();


        if (
          relation !== 'F-Friend' &&
          relation !== 'Relation'
        ) {
          return false;
        }


        if (!person.Anniversary) {
          return false;
        }


        const anniversary =
          this.convertDate(person.Anniversary);


        return next10Days.includes(
          `${anniversary.getDate()}-${anniversary.getMonth()}`
        );

      })
      .sort((a, b) => {

        return this.getNextDate(a.Anniversary!)
          .getTime()
          -
          this.getNextDate(b.Anniversary!)
          .getTime();

      });


  }




  convertDate(value: string): Date {

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


    const [day, month] = value.trim().split(' ');


    return new Date(
      new Date().getFullYear(),
      months.indexOf(month),
      Number(day)
    );

  }




  // Used for sorting nearest upcoming date first

  getNextDate(value: string): Date {

    const date = this.convertDate(value);

    const today = new Date();


    if (date < today) {

      date.setFullYear(
        today.getFullYear() + 1
      );

    }


    return date;

  }

}