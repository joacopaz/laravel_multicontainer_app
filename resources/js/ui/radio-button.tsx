import { cn } from '@/lib/utils';
import type { SelectionState } from '@/types';
import type { Dispatch } from 'react';

type Props = {
    selectionState: SelectionState;
    setSelectionState: Dispatch<SelectionState>;
    label: SelectionState;
};

export default function RadioButton({ selectionState, setSelectionState, label }: Props) {
    const isSelected = selectionState === label;
    const selectSelf = () => setSelectionState(label);

    return (
        <label className="flex w-max cursor-pointer items-center gap-[10px] text-sm font-bold text-[#000]" onClick={selectSelf} onKeyUp={selectSelf}>
            <div className={cn('h-4 w-4 rounded-[50%]', isSelected ? 'border-[6px] border-[#0094ff]' : 'border border-[var(--pinkish-grey)]')} />
            {label}
        </label>
    );
}
