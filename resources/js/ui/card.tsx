import { cn } from '@/lib/utils';
import type { ComponentProps, PropsWithChildren } from 'react';

type DivProps = ComponentProps<'div'>;

export default function Card({ children, className, ...divProps }: PropsWithChildren<DivProps>) {
    return (
        <div
            className={cn(
                className,
                'sw-shadow flex flex-col rounded-[4px] bg-white p-[30px] [--shadow-blur:2px] [--shadow-color:var(--warm-grey)] [--shadow-y:1px]',
            )}
            {...divProps}
        >
            {children}
        </div>
    );
}
