export interface IInputArg {
  name: string;
  type: string;
  label: string;
  value: string;
}
export interface IValidatorArg {
  minLength?: number;
  maxLength?: number;
}
