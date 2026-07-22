import { ChangeDetectorRef, Component } from '@angular/core';
import { Person } from '../../model/person';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manageusers',
  imports: [CommonModule,FormsModule],
  templateUrl: './manageuserf.html',
  styleUrl: './manageuserf.css',
})
export class ManageuserF {
  people: Person[] = [];
  motherPeople:Person[]=[];
  searchText='';
  constructor(private router:Router,private cdf:ChangeDetectorRef
  ){}
  ngOnInit(): void {
    this.loadUsers();
    this.cdf.detectChanges();
  }

  loadUsers() {
    this.people = JSON.parse(localStorage.getItem('people') || '[]');
     this.motherPeople = this.people.filter(
      p => p.Relation === 'Relation' || p.Relation === 'F-Friend'
    );
  }

  deleteUser(person: Person) {
  const index = this.people.findIndex(p =>
    p.Name === person.Name &&
    p.DOB === person.DOB &&
    p.Relation === person.Relation
  );

  if (index !== -1) {
    this.people.splice(index, 1);
    localStorage.setItem('people', JSON.stringify(this.people));
    this.loadUsers();
  }
  alert("Do You want to");
}
     editUser(person:Person) {
    const index=this.people.findIndex(p=>p.Name===person.Name && p.DOB===person.DOB && p.Relation===person.Relation);
  this.router.navigate(['/editf', index]);
}
searchUser() {

  const text = this.searchText.toLowerCase().trim();

  this.motherPeople = this.people.filter(person =>
    (person.Relation === 'Relation' || person.Relation === 'M-Friend') &&
    person.Name.toLowerCase().includes(text)
  );
}
}
