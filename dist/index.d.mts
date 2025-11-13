import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}
declare const Button: React.FC<ButtonProps>;

export { Button, type ButtonProps };
