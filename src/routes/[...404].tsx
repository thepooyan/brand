import { HttpStatusCode } from "@solidjs/start";
import Spinner from "~/components/parts/Spinner";

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="h-dvh flex flex-col justify-center items-center gap-4">
        لطفا صبر کنید
        <Spinner reverse/>
      </div>
    </>
  );
}
