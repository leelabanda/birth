import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person } from '../../../model/person';
import { ActivatedRoute, Route } from '@angular/router';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditF {
  person!:Person;
  newName = '';
  people:Person[]=[];
  constructor(private router:ActivatedRoute){}
  ngOnInit(){
    this.people=JSON.parse(localStorage.getItem('people')||'[]');
    const id=Number(this.router.snapshot.paramMap.get('id'));
    this.person={...this.people[id]};
  this.person.DOB = this.toInputDate(this.person.DOB);

  if (this.person.Anniversary) {
    this.person.Anniversary = this.toInputDate(this.person.Anniversary);
  }
}
toInputDate(value: string): string {

  if (!value) return '';

  const date = new Date(value + ' ' + new Date().getFullYear());
  const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

return `${year}-${month}-${day}`;
}
  updateUser(){
    const id=Number(this.router.snapshot.paramMap.get('id'));
     this.person.DOB = this.formatDate(this.person.DOB);
  this.person.Anniversary = this.formatDate(this.person.Anniversary);

    this.people[id]=this.person;
    localStorage.setItem('people',JSON.stringify(this.people));
    alert("User Updated Successfully");
  }
    formatDate(date: string): string {
      if(!date)return '';

    const d = new Date(date);

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

    return `${d.getDate()} ${months[d.getMonth()]}`;
  }
}
