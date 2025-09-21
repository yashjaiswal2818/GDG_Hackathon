"use client";
//import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const handleBookmark = async () => {
    if (bookmarked) {
      // await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };
  return (
    <article className="companion-card group">
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={14}
            height={16}
          />
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-muted-foreground">{topic}</p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={14}
          height={14}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          <span>Launch Lesson</span>
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
