/**
 * @description Test result holder
 */
export interface Result {
  age: number;
  gpa: number;
  scores: Array<{
    time: number;
    status: number;
    type: number;
  }>;
}
