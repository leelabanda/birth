import { ChangeDetectorRef, Component } from '@angular/core';
import { Person } from '../../model/person';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Xliff } from '@angular/compiler';
@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
    people: Person[] = [];
    selectedFileName:string='';
    constructor(private http:HttpClient,private cdf:ChangeDetectorRef){}
    ngOnInit(): void {
    const data = localStorage.getItem('people');

    if (data) {
      this.people = JSON.parse(data);
    }

  }
// loadExcel() {

//   this.http
//     .get('assets/Surekha Friends.xlsx', {
//       responseType: 'arraybuffer'
//     })
//     .subscribe((data: ArrayBuffer) => {

//       const workbook = XLSX.read(data, {
//         type: 'array'
//       });

//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       const excelData = XLSX.utils.sheet_to_json<any>(worksheet);

//       this.people = excelData.map(item => ({
//         Name: item["Name"],
//         DOB: item["DOB"],
//         Anniversary: item["Marriage day"],
//         Relation: item["Relation"],
//         Location: item["Location"],
//         City: item["City"],
//         SubRelation: item["SubRelation"]
//       }));

//       console.log(this.people);

//       localStorage.setItem(
//         'people',
//         JSON.stringify(this.people)
//       );

//     });

// }

  onFileChange(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length===0) {
    return;
  }
  const file=input.files[0];
   this.selectedFileName = file.name;
  const reader = new FileReader();

  reader.onload = (e: any) => {

    const workbook = XLSX.read(e.target.result, {
      type: 'binary'
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const excelData = XLSX.utils.sheet_to_json<any>(worksheet);

    const newPeople = excelData.map(item => ({
      Name: item["Name"],
DOB: this.excelDateToString(item["DOB"]),
  Anniversary: this.excelDateToString(item["Marriage day"]),
      Relation: item["Relation"],
      Location: item["Location"],
      City: item["City"],
      SubRelation: item["SubRelation"],
      MobileNumber:item['Contact']
    }));

    console.log(this.people);
    this.people = [...this.people, ...newPeople];
    localStorage.setItem(
      'people',
      JSON.stringify(this.people)
    );

    alert('Excel Imported Successfully');
    this.cdf.detectChanges();
  };

  reader.readAsBinaryString(file);

}

  
  clearData() {

    localStorage.removeItem('people');

    this.people = [];

  }
excelDateToString(value: any): string {

  if (!value) {
    return '';
  }

  // Excel serial number (real date)
  if (typeof value === 'number') {

    const parsed = XLSX.SSF.parse_date_code(value);

    return `${parsed.d} ${new Date(parsed.y, parsed.m - 1, parsed.d)
      .toLocaleString('en-US', { month: 'long' })}`;
  }

  // If value is already like "24 January"
  if (typeof value === 'string' && value.includes(' ')) {
    return value;
  }

  // Handle "Jan-24"
  if (typeof value === 'string' && value.includes('-')) {

    const [month, day] = value.split('-');

    const months: any = {
      Jan: 'January',
      Feb: 'February',
      Mar: 'March',
      Apr: 'April',
      May: 'May',
      Jun: 'June',
      Jul: 'July',
      Aug: 'August',
      Sep: 'September',
      Oct: 'October',
      Nov: 'November',
      Dec: 'December'
    };

    return `${Number(day)} ${months[month]}`;
  }

  return '';
}
exportExcel():void{
  if(this.people.length===0){
    alert("No Data Available");
    return;
  }
  const worksheet=XLSX.utils.json_to_sheet(this.people);
  const workbook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook,worksheet,'people');
  XLSX.writeFile(workbook,'BirthdayRemainder.xlsx');
}
downloadTemplate():void{
  const link=document.createElement('a');
  link.href='assets/template/Birthday.xlsx';
  link.download = 'Birthday.xlsx';
  link.click();
}
}