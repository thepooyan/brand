import { FiCheck } from "solid-icons/fi";
import { closeModal } from "~/components/layout/Modal";
import { Button } from "~/components/ui/button";

const SuccessOrder = () => {
  return (
    <div class="flex gap-4 flex-col">
      <div class="bg-green-600 text-white rounded-full mx-auto p-2 flex justify-center items-center w-max">
        <FiCheck class="text-xl" />
      </div>
      سفارش شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.
      <br />
      جهت مطلع شدن از وضعیت سفارش خود، میتواند تماس حاصل کنید.
      <Button
        class="mt-2"
        as="A"
        href="/ContactUs"
        onclick={() => closeModal()}
      >
        راه های ارتباطی
      </Button>
    </div>
  );
};

export default SuccessOrder;
