import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YearlyIncome } from '../models/yearly-income';

@Injectable({
  providedIn: 'root'
})
export class BookKeepingService {
  apiUrl = 'https://localhost:7075/api/bookKeeping'
  public incomeYears: number[] = [];
  public incomeData: YearlyIncome[] = [];
  constructor(private http: HttpClient) { }

   getIncomeYears() {
    this.http.get(`${this.apiUrl}/years`).subscribe((res: any) => {
      this.incomeYears = res;
    });
  }

  
  getYearlyIncome(year: number) {
    return this.http.get(`${this.apiUrl}/${year}`);
   }

   updateDynamicValueofYearlyIncome(yearlyIncome: any){
    debugger;
     this.http.post(`${this.apiUrl}/updateDynamicValue`, yearlyIncome).subscribe((res: any) => {
      if(res){
        debugger;
      }
    });
   }
}
