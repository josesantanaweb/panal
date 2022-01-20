export interface InputProps {
  onChange?: () => void;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  search?: boolean;
  required?: boolean;
  textarea?: boolean;
  id?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  field?: any;
	form?: any;
  error?: string;
}
