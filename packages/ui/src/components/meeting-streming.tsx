import { Hand, Info, MessageSquareText, Mic, MoreVertical, PhoneOff, Shapes, SquareArrowUp, Users, Video } from "lucide-react";

export function MeetingStreming() {
    return (
        <div className="flex flex-col gap-4 h-screen">
            <header className="p-2">
                <div className="h-16 flex items-center py-2 px-4 justify-between rounded-lg bg-neutral-700">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-neutral-500 flex items-center justify-center">
                            FH
                        </div>
                        <span>Fahima is preseting</span>
                    </div>
                </div>
            </header>
            <main className="flex-1 grid grid-cols-1 md:grid-cols-3 px-2 gap-4">
                <div className="col-span-2 px-6">
                    <div className="w-full h-full rounded-xl bg-neutral-900" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <span className="inline-block col-span-3 rounded-xl items-center justify-center bg-neutral-900">{i + 1}</span>
                    ))}
                </div>
            </main>
            <footer className="p-4">
                <div className="h-16 p-2 flex items-center gap-4 justify-between">
                    <div>
                        <span>Class meeting</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button type="button" className="size-10 rounded-full flex items-center justify-center bg-neutral-700"><Mic /></button>
                        <button type="button" className="size-10 rounded-full flex items-center justify-center bg-neutral-700"><Video /></button>
                        <button type="button" className="size-10 rounded-full flex items-center justify-center bg-neutral-700"><Mic /></button>
                        <button type="button" className="size-10 rounded-full flex items-center justify-center bg-neutral-700"><Hand /></button>
                        <button type="button" className="size-10 rounded-full flex items-center justify-center bg-neutral-700"><SquareArrowUp /></button>
                        <button type="button" className="size-10 rounded-full flex items-center justify-center bg-neutral-700"><MoreVertical /></button>
                        <button type="button" className="h-10 w-14 rounded-full flex items-center justify-center bg-red-500"><PhoneOff /></button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button"><Info /></button>
                        <button type="button"><Users /></button>
                        <button type="button"><MessageSquareText /></button>
                        <button type="button"><Shapes /></button>
                    </div>
                </div>
            </footer>
        </div>
    )
}