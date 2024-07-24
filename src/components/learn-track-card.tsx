"use client";

import { Button } from "./ui/button";

type LearnTrackCardProps = {
    title: string;
    content: string;
    index: number;
};

export function LearnTrackCard({ title, content, index }: LearnTrackCardProps) {
    return (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-9 px-2">
            {index % 2 === 0 ? (
                <>
                    <div className="col-span-4 h-full w-full">
                        <div className="h-full w-full rounded-2xl border-2 shadow-lg">
                            <div className="rounded-t-md bg-primary px-2">
                                <h1 className="py-2 text-xl font-medium text-white">
                                    {title}
                                </h1>
                            </div>
                            <div className="px-2 py-6">
                                <p className="text-xs sm:text-sm">{content}</p>
                                <Button className="mt-4">Começar</Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative col-span-1 flex h-full w-full items-center justify-center">
                        <div className="h-full w-1 bg-primary"></div>
                        <div className="absolute z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary p-6 text-center text-2xl font-bold text-white">
                            {index + 1}
                        </div>
                    </div>
                    <div className="col-span-4 h-full w-full"></div>
                </>
            ) : (
                <>
                    <div className="col-span-4 h-full w-full"></div>
                    <div className="relative col-span-1 flex h-full w-full items-center justify-center">
                        <div className="h-full w-1 bg-primary"></div>
                        <div className="absolute z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary p-6 text-center text-2xl font-bold text-white">
                            {index + 1}
                        </div>
                    </div>
                    <div className="col-span-4 h-full w-full">
                        <div className="h-full w-full rounded-2xl border-2 shadow-lg">
                            <div className="rounded-t-md bg-primary px-2">
                                <h1 className="py-2 text-xl font-medium text-white">
                                    {title}
                                </h1>
                            </div>
                            <div className="px-2 py-6">
                                <p className="text-xs sm:text-sm">{content}</p>
                                <Button className="mt-4">Começar</Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
