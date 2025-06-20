import { pageMarker } from "~/lib/routeChangeTransition";

const index = () => {
  return (
    <div class=" bg-zinc-800 p-2 text-center rounded m-4 max-w-xl mx-auto" {...pageMarker()}>
      داشبورد پنل کاربری
    </div>
  );
};

export default index;
