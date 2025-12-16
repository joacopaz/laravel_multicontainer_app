import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

type Props = {
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    onClick?: () => void;
    label: string;
    isDisabled?: boolean;
    className?: string;
};

export default function Button({ onClick, type, label, isDisabled, className }: Props) {
    return (
        <button
            disabled={isDisabled}
            className={cn(
                'cursor-pointer rounded-[20px] bg-[#0ab463] px-5 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#089c56] disabled:cursor-auto disabled:bg-[var(--pinkish-grey)]',
                className,
            )}
            onClick={onClick}
            type={type}
        >
            {label.toUpperCase()}
        </button>
    );
}
