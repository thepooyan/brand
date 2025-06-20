import { pageMarker } from "~/lib/routeChangeTransition";

const index = () => {
  return (
    <div class=" bg-zinc-800 rounded m-4 max-w-xl mx-auto" {...pageMarker()}>
      hey
    </div>
  );
};

export default index;
