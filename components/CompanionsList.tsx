
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-bold text-2xl gradient-text mb-4">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow className="border-border/50">
                        <TableHead className="text-base w-2/3">Lessons</TableHead>
                        <TableHead className="text-base">Subject</TableHead>
                        <TableHead className="text-base text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({ id, subject, name, topic, duration }) => (
                        <TableRow key={id} className="border-border/30 hover:bg-card/30 transition-colors duration-200">
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="size-[60px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={28}
                                                height={28} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-lg">
                                                {name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={16}
                                        height={16}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-lg font-medium">
                                        {duration} {' '}
                                        <span className="max-md:hidden text-muted-foreground">mins</span>
                                    </p>
                                    <Image src="/icons/clock.svg" alt="minutes" width={12} height={12} className="md:hidden" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionsList;