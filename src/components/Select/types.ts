import { ISelect } from "interfaces";

export interface SelectProps {
  options: ISelect[]
  selectedOption: any
  open: boolean
  required?: boolean
  label?: string
  setOpen?: any
  handleOpenSelect: () => void
  setSelectedOption: any
}
