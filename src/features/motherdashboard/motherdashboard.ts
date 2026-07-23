import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motherdashboard',
  imports: [CommonModule],
  templateUrl: './motherdashboard.html',
  styleUrl: './motherdashboard.css',
})
export class Motherdashboard {

  people:Person[] = [];

  upCommingBirthdays:Person[] = [];

  upCommingAnniversaries:Person[] = [];


  ngOnInit(){

    const data = localStorage.getItem('people');

    if(data){
      this.people = JSON.parse(data);
    }

    this.loadUpcommingEvents();
  }


  loadUpcommingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getTargetDate = (dateStr: string): Date | null => {
      if (!dateStr) return null;
      const eventDate = this.convertDate(dateStr);
      
      // Roll over to next year if the event date already passed this year
      if (eventDate.getTime() < today.getTime()) {
        eventDate.setFullYear(today.getFullYear() + 1);
      }
      return eventDate;
    };

    const maxDaysAhead = 10;

    // --- Process Birthdays ---
    this.upCommingBirthdays = this.people.filter(person => {
      if (person.Relation !== 'M-Friend' && person.Relation !== 'Relation') {
        return false;
      }
      const targetDate = getTargetDate(person.DOB);
      if (!targetDate) return false;

      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays >= 0 && diffDays <= maxDaysAhead;
    }).sort((a, b) => {
      const dateA = getTargetDate(a.DOB)!.getTime();
      const dateB = getTargetDate(b.DOB)!.getTime();
      return dateA - dateB;
    });

    // --- Process Anniversaries ---
    this.upCommingAnniversaries = this.people.filter(person => {
      if (person.Relation !== 'M-Friend' && person.Relation !== 'Relation') {
        return false;
      }
      const targetDate = getTargetDate(person.Anniversary);
      if (!targetDate) return false;

      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays >= 0 && diffDays <= maxDaysAhead;
    }).sort((a, b) => {
      const dateA = getTargetDate(a.Anniversary)!.getTime();
      const dateB = getTargetDate(b.Anniversary)!.getTime();
      return dateA - dateB;
    });
  }

  convertDate(value: string): Date {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [day, month] = value.trim().split(' ');
    
    const d = new Date(
      new Date().getFullYear(),
      months.indexOf(month),
      Number(day)
    );
    d.setHours(0, 0, 0, 0);
    return d;
  }


  // convertDate(value:string):Date{

  //   const months = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December'
  //   ];


  //   const [day, month] = value.split(' ');


  //   return new Date(
  //     new Date().getFullYear(),
  //     months.indexOf(month),
  //     Number(day)
  //   );

  // }

}