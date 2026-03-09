import { pageMarker } from "~/lib/routeChangeTransition";

const index = () => {
  return (
    <div class="container mb-80 mt-20 text-center" {...pageMarker()}>
      <h1 class="text-xl font-bold">
        به پنل کاربری خوش آمدید
      </h1>
      <p class="text-muted-foreground text-sm">
        یکی از تب ها را انتخاب کنید
      </p>
    </div>
  );
};

export default index;
