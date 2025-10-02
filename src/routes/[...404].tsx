import { HttpStatusCode } from "@solidjs/start";
import TA from "~/components/parts/TA";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="h-dvh flex flex-col justify-center items-center gap-4">
        متاسفانه صفحه مورد نظر یافت نشد!
        <div>
          <Button variant="secondary" as={TA} href="/">خانه</Button>
        </div>
      </div>
    </>
  );
}
