import Button from '@/ui/button';
import Card from '@/ui/card';
import { router } from '@inertiajs/react';

type Props = {
    status?: number;
    message?: string;
};

export default function ErrorPage(props: Props) {
    return (
        <div className="flex max-h-[calc(100vh-115px)] justify-center gap-[30px]">
            <Card className="max-w-3/5 gap-10 text-center">
                <p className="font-bold">You might've taken the wrong turn!</p>
                <img src="/404.jpg" alt="A cool star wars character" className="mx-auto w-1/2" />
                <div className="gap 1.5 flex flex-col items-center gap-2">
                    {!!props.status && <p>Status: {props.status}</p>}
                    {!!props.message && <p>{props.message}</p>}
                    <Button label="take me back to my galaxy" onClick={() => router.visit('/')} className="mt-5 w-max" />
                </div>
            </Card>
        </div>
    );
}
