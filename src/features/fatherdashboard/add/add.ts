import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Person } from '../../../model/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class AddF {
  person:Person={
    Name:'',
    DOB:'',
    Anniversary:'',
    Relation:'',
    SubRelation:'',
    City:'',
    Location:'',
    MobileNumber:''
  };
  constructor(private router:Router){}
  savePerson(){
    const people:Person[]=JSON.parse(localStorage.getItem('people')||'[]');
    const newPerson: Person = {
  Name: this.person.Name,
  DOB: this.person.DOB ? this.formatDate(this.person.DOB) : '',
  Anniversary: this.person.Anniversary
    ? this.formatDate(this.person.Anniversary)
    : '',
  Relation: this.person.Relation,
  SubRelation: this.person.SubRelation,
  City: this.person.City,
  Location: this.person.Location,
  MobileNumber:this.person.MobileNumber
};
    people.push(newPerson);
    localStorage.setItem('people',JSON.stringify(people));
    alert('Person Successfully Saved');
    this.person={
      Name:'',
      DOB:'',
      Anniversary:'',
      Relation:'',
      SubRelation:'',
      City:'',
      Location:'',
      MobileNumber:''
    };
    this.router.navigate(['/father/users'])
  }
   formatDate(date: string): string {

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
