export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'error' | 'gray' | 'tertiary';
  disabled?: boolean;
  full?: boolean;
}
