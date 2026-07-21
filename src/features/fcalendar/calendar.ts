import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Person } from '../../model/person';

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class CalendarM {

  people: Person[] = [];

  today = new Date();

  currentMonth = this.today.getMonth();

  currentYear = this.today.getFullYear();

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

  weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  calendarDays: CalendarDay[] = [];

  ngOnInit() {

    const data = localStorage.getItem('people');

    if (data) {
      this.people = JSON.parse(data);
    }

    this.generateCalendar();

  }

  get monthName(): string {
    return this.months[this.currentMonth];
  }

  generateCalendar() {

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

    // Empty cells before day 1
    for (let i = 0; i < firstDay; i++) {

      this.calendarDays.push({
        day: 0,
        isCurrentMonth: false
      });

    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {

      this.calendarDays.push({
        day: i,
        isCurrentMonth: true
      });

    }

    // Fill remaining cells to make 6 rows (42 cells)
    while (this.calendarDays.length < 42) {

      this.calendarDays.push({
        day: 0,
        isCurrentMonth: false
      });

    }

  }

  previousMonth() {

    if (this.currentMonth === 0) {

      this.currentMonth = 11;
      this.currentYear--;

    } else {

      this.currentMonth--;

    }

    this.generateCalendar();

  }

  nextMonth() {

    if (this.currentMonth === 11) {

      this.currentMonth = 0;
      this.currentYear++;

    } else {

      this.currentMonth++;

    }

    this.generateCalendar();

  }

  hasBirthday(day: number): boolean {

    if (day === 0) return false;

    return this.people.some(person => {

      if (!person.DOB) return false;
      if(person.Relation==='F-Friend') return false;
      const parts = person.DOB.trim().split(' ');

      return Number(parts[0]) === day &&
             parts[1].toLowerCase() === this.monthName.toLowerCase();

    });

  }

  hasAnniversary(day: number): boolean {

    if (day === 0) return false;

    return this.people.some(person => {

      if (!person.Anniversary) return false;
      if(person.Relation==='F-Friend') return false;
      const parts = person.Anniversary.trim().split(' ');

      return Number(parts[0]) === day &&
             parts[1].toLowerCase() === this.monthName.toLowerCase();

    });

  }

  getBirthdays(day: number): Person[] {

    if (day === 0) return [];

    return this.people.filter(person => {

      if (!person.DOB) return false;
      if (person.Relation === 'F-Friend') return false;
      const parts = person.DOB.trim().split(' ');

      return Number(parts[0]) === day &&
             parts[1].toLowerCase() === this.monthName.toLowerCase();

    });

  }

  getAnniversaries(day: number): Person[] {

    if (day === 0) return [];

    return this.people.filter(person => {

      if (!person.Anniversary) return false;
      if (person.Relation === 'F-Friend') return false;
      const parts = person.Anniversary.trim().split(' ');

      return Number(parts[0]) === day &&
             parts[1].toLowerCase() === this.monthName.toLowerCase();

    });

  }

  isToday(day: number): boolean {

    if (day === 0) return false;

    return (
      day === this.today.getDate() &&
      this.currentMonth === this.today.getMonth() &&
      this.currentYear === this.today.getFullYear()
    );

  }

}