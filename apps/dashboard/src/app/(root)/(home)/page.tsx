import Main from "@/components/main";
import { ScrollArea } from "@v1/ui/scroll-area";
import { Suspense } from "react";

import { Badge } from "@v1/ui/badge";
import { Button } from "@v1/ui/button";
import { Card } from "@v1/ui/card";

import { toast } from "sonner";
import ClockInOut from "./components/clock-in-out";
import { ClockInOutSkeleton } from "./components/clock-in-out/clock-in-out.loading";
import CurrentTasks from "./components/current-tasks";
import TasksLoading from "./components/current-tasks/tasks.loading";
import Events from "./components/events";
import { eventsSearchParamsCache } from "./components/events/events-search-params";
import Notes from "./components/notes";
import NotesLoading from "./components/notes/notes.loading";
import WelcomeMessage from "./components/welcome";
import { WelcomeMessageLoading } from "./components/welcome/welcome.loading";
// export const metadata = {
//   title: "Home",
// };
type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};
export default function Page({ searchParams }: Props) {
  eventsSearchParamsCache.parse(searchParams);
  return (
    <Main
      isMaxHeight
      className="space-y-4 sm:space-y-0 sm:grid  sm:gap-4 sm:grid-rows-[min-content_repeat(3,1fr)] lg:grid-rows-[min-content_repeat(2,1fr)] sm:grid-cols-2 lg:grid-cols-4"
    >
      <Suspense fallback={<WelcomeMessageLoading />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<ClockInOutSkeleton />}>
        <ClockInOut />
      </Suspense>

      <Events />
      <Suspense fallback={<NotesLoading />}>
        <Notes />
      </Suspense>

      <Suspense fallback={<TasksLoading />}>
        <CurrentTasks />
      </Suspense>

      <Card className="w-full  p-0 min-h-[300px] max-h-[350px] md:max-h-fit">
        PROJECTS
      </Card>
      <Card className="w-full  p-0 min-h-[300px] max-h-[350px] md:max-h-fit">
        metrics
      </Card>
    </Main>
  );
}
