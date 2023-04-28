import { Component, OnInit } from '@angular/core';
import { BookKeepingService } from 'src/app/services/book-keeping.service';
import { CostDynamic, CostDynamicSingle, IncomeDynamic, IncomeDynamicSingle, MonthlyCost, MonthlyIncome, YearlyIncome } from 'src/app/models/yearly-income';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss']
})
export class ReconciliationComponent implements OnInit {

  selectedValue: number = 2020;

  months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  incomeData: MonthlyIncome [] = [];

  cIncomeData: { id: number,   month: number, value: number }[] = [];

  costData: MonthlyCost [] = [];

  result: { name: Number, value: number }[] = [];
  rResult: { name: Number, value: number }[] = [];
  finalResult: { name: Number, value: number }[] = [];
  cFinalResult: { name: Number, value: number }[] = [];
  incomeDynamic: IncomeDynamic[] = [];
  dynamicIncomes: IncomeDynamicSingle[] = [];
  dynamicCosts: CostDynamicSingle[] = [];
  costDynamic: CostDynamic[] = [];

  cCostData: { id: number, month: number, value: number }[] = [];
  i = 0;
  editId: string | null = null;
  YearlyIncomeData : YearlyIncome = {} as YearlyIncome;
  constructor(public bookKeepingService: BookKeepingService) {
    
  }


  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    debugger;
    this.calculateCumulativeCost();
    this.calculateCumulativeIncome();
    this.calculateTotalIncome();
    this.calculateRResult();
    this.calculateFinalResult();
    this.calculateCumulativeFinalResult();
    this.editId = null;
    // Remove the 'email' property from all person objects
     let dynamicIncomes  = this.dynamicIncomes.map((item) => {
      //remove incomes ids
      debugger;
      let incomes  = item.incomes.map((item) => {
        return {
          month: item.month,
          income: item.income
        }
      });
      return {
        id: item.id,
        name: item.name,
        incomes: JSON.stringify(incomes)
      };
    });
    let dynamicCosts  = this.dynamicCosts.map((item) => {
      //remove incomes ids
      let incomes  = item.costs.map((item) => {
        return {
          month: item.month,
          income: item.cost
        }
      });
      return {
        id: item.id,
        name: item.name,
        incomes: JSON.stringify(incomes)
      };
    });
debugger;
 
    let YearlyIncome = 
    {
      id: this.YearlyIncomeData.id,
      year: this.YearlyIncomeData.year,
      totalIncome: this.cFinalResult[this.cFinalResult.length - 1].value,
      monthlyIncomes: this.YearlyIncomeData.monthlyIncomes,
      monthlyCosts: this.YearlyIncomeData.monthlyCosts,
      incomeDynamics: dynamicIncomes,
      costDynamics: dynamicCosts
    };
    debugger;
 
    this.bookKeepingService.updateDynamicValueofYearlyIncome(YearlyIncome);

   
  }

  calculateRResult() {
    // add all dynamicIncomes
    this.rResult = [];
    for(let i = 0; i < this.months.length; i++) {
      let income = 0;
      let cost = 0;
      for(let j = 0; j < this.dynamicIncomes.length; j++) {
        income += this.dynamicIncomes[j].incomes[i].income;
      }

      for(let j = 0; j < this.dynamicCosts.length; j++) {
        cost += this.dynamicCosts[j].costs[i].cost;
      }
      this.rResult.push({
        name: i,
        value: income - cost
      });
    }   
  
  }

  calculateFinalResult(){
    this.finalResult = [];
    for (let i = 0; i < this.rResult.length; i++) {
      this.finalResult.push({
        name:  this.rResult[i].name,
        value: this.rResult[i].value + this.result[i].value
      });
    }
  }

  calculateCumulativeFinalResult(){
    let cumulativeIncomeResult = 0;
    this.cFinalResult = [];
    for (let i = 0; i < this.finalResult.length; i++) {
      cumulativeIncomeResult +=  this.finalResult[i].value;
      this.cFinalResult.push({
        name:  this.finalResult[i].name,
        value: cumulativeIncomeResult
      });
    }
  }


  calculateTotalIncome() {
    this.result = [];
    for (let i = 0; i < this.incomeData.length; i++) {
      this.result.push({
        name:  this.incomeData[i].month,
        value: this.incomeData[i].income - this.costData[i].cost
      });
    }
  }
 
  calculateCumulativeIncome() {
    let cumulativeIncome = 0;
    this.cIncomeData = [];
    for (let i = 0; i < this.incomeData.length; i++) {
      cumulativeIncome +=  this.incomeData[i].income;
      this.cIncomeData.push({
        id:  this.incomeData[i].id,
        month:  this.incomeData[i].month,
        value: cumulativeIncome
      });
    }

  }

  calculateCumulativeCost() {
    let cumulativeCost = 0;
    this.cCostData = [];
    for (let i = 0; i < this.costData.length; i++) {
      cumulativeCost +=  this.costData[i].cost;
      this.cCostData.push({
        id:  this.costData[i].id,
        month:  this.costData[i].cost,
        value: cumulativeCost
      });
    }

  }
  changeYear(){
    this.dataLoad();
  }

   ngOnInit(){
    this.dataLoad();
  }

  dataLoad(){
    if(this.bookKeepingService.incomeYears.length === 0){
      this.bookKeepingService.getIncomeYears();
    }

    if(this.bookKeepingService.incomeData.length === 0){
    this.bookKeepingService.getYearlyIncome(this.selectedValue).subscribe((res: any) => {
      this.YearlyIncomeData = res;
      this.incomeData = res.monthlyIncomes;
      this.costData = res.monthlyCosts;
      this.incomeDynamic = res.incomeDynamics;
      this.costDynamic = res.costDynamics;
 
      this.dynamicIncomes = this.incomeDynamic.map((item) => {
        let parsedIncomes = JSON.parse(item.incomeValueJson);
        let incomesWithId = parsedIncomes.map((income:any) => {
          return {
            ...income,
            id:  uuidv4()
          };
        });
        return {
          id: item.id,
          name: item.incomeName,
          incomes: incomesWithId
        };
      });

      this.dynamicCosts = this.costDynamic.map((item) => {
        let parsedCosts = JSON.parse(item.costValueJson);
        let costWithId = parsedCosts.map((cost:any) => {
          return {
            ...cost,
            id:  uuidv4()
          };
        });
        return {
          id: item.id,
          name: item.costName,
          costs: costWithId
        };
      });


    
     this.calculateCumulativeCost();
     this.calculateCumulativeIncome();
     this.calculateTotalIncome();
     this.calculateRResult();
     this.calculateFinalResult();
     this.calculateCumulativeFinalResult();
    });
    }
  }
}
