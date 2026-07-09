export type PortfolioStatus = 'active' | 'inactive';

export type PortfolioRisk =
  | 'low'
  | 'medium'
  | 'high';

export interface Portfolio {
  id: string;
  name: string;
  clientId: string;
  balance: number;
  profitability: number;
  risk: PortfolioRisk;
  status: PortfolioStatus;
}