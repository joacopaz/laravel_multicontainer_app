type Props = {
    placeholder?: string;
    value: string;
    setValue: (newValue: string) => void;
};

export default function TextInput({ placeholder, value, setValue }: Props) {
    return (
        <input
            className="h-10 rounded-sm border-[1px] border-[var(--pinkish-grey)] p-[10px] text-sm font-bold shadow-[inset_0_1px_3px_0_#848484bf] outline-none placeholder:text-[#c4c4c4] focus:border-[#383838]"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
            maxLength={100}
        />
    );
}
