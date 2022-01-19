import { ISelect } from "interfaces";

export interface SelectProps {
  options: ISelect[]
  selectedOption: ISelect
  open: boolean
  required?: boolean
  label?: string
  setOpen?: any
  handleOpenSelect: () => void
  setSelectedOption: any
}
