export interface YearlyIncome {
    id: number;
    year: number;
    totalIncome: number;
    monthlyIncomes: MonthlyIncome[];
    monthlyCosts: MonthlyCost[];
    incomeDynamics: IncomeDynamic[];
    costDynamics: CostDynamic[];
  }
  
  export interface MonthlyIncome {
    id: number;
    month: number;
    income: number;
    yearlyIncomeId: number;
  }
  
  export interface MonthlyCost {
    id: number;
    month: number;
    cost: number;
    yearlyIncomeId: number;
  }
  
  export interface IncomeDynamic {
    id: number;
    incomeName: string;
    incomeValueJson: string;
    yearlyIncomeId: number;
  }
  
  export interface CostDynamic {
    id: number;
    costName: string;
    costValueJson: string;
    yearlyIncomeId: number;
  }
  

  export interface IncomeDynamicSingle {
    id: number;
    name: string;
    incomes: Income[];
  }
  export interface Income {
    id:string;
    month: number;
    income: number;
  }

  export interface CostDynamicSingle {
    id: number;
    name: string;
    costs: Cost[];
  }
  export interface Cost {
    id:string;
    month: number;
    cost: number;
  }