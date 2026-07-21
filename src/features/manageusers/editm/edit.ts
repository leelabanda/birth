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
export class EditM {
  person!:Person;
  people:Person[]=[];
  constructor(private router:ActivatedRoute){}
  ngOnInit(){
    this.people=JSON.parse(localStorage.getItem('people')||'[]');
    const id=Number(this.router.snapshot.paramMap.get('id'));
    this.person={...this.people[id]};
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
  if (!date) return '';

  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'long' });

  return `${day} ${month}`;
}
}
