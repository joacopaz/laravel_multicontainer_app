import type { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <header className={'sw-shadow bg-white py-3.5 text-center text-[18px] font-bold text-[#0ab463] [--shadow-y:2px]'}>SWStarter</header>
            <main className="py-[30px]">{children}</main>
        </>
    );
};
