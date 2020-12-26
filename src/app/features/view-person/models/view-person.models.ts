export interface ChartData {
  x: Date;
  y: number;
}

export interface Comparison {
  direction: ComparisonDirectionEnum;
  amount: number;
}

export enum ComparisonDirectionEnum {
  UP = 'up',
  DOWN = 'down',
}

export interface DataTableRow {
  title: string;
  releaseDate: Date;
  rating: number;
  comparison: Comparison | null;
}
