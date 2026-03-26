import { panelPageMarker } from "~/lib/routeChangeTransition";

const index = () => {
  return (
    <div class="flex flex-col justify-center items-center h-full" {...panelPageMarker()}>
      <h1 class="text-xl font-bold">
        به پنل کاربری خوش آمدید
      </h1>
      <p class="text-muted-foreground text-sm">
        جهت ادامه یکی از تب ها را انتخاب کنید
      </p>
    </div>
  );
};

export default index;
