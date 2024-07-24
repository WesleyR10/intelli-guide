import Link from "next/link";
import Image from "next/image";
import ImgPoints from "@/public/points.svg";
import ImgHeart from "@/public/heart.svg";
import { Button } from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";
import { Courses } from "@prisma/client";

type Props = {
    activeCourse: Courses
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;

}

export const UserProgress = ({ activeCourse, points, hearts, hasActiveSubscription }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/dashboard/courses">
                <Button variant="guost">
                    <Image
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="guost" className="text-orange-500">
                    <Image src={ImgPoints} height={28} width={28} alt="Points" className="mr-2" />
                    {points}

                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="guost" className="text-orange-500">
                    <Image src={ImgHeart} height={22} width={22} alt="heart" className="mr-2" />
                    {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> : hearts}

                </Button>
            </Link>

        </div>
    );
};