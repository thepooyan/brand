import { FiPlus } from "solid-icons/fi"
import X from "~/components/ui/x"
import { SetStoreFunction } from "solid-js/store"
import { TrainingData } from "~/db/schema"
import Input from "~/components/ui/input"
import { Button } from "~/components/ui/button"

interface p<T> {
  store: T
  setStore: SetStoreFunction<T>
}
const SocialLinkInputs = ({store, setStore}:p<TrainingData>) => {
  return (
    <>
      {store.social.map((s, i) => (
        <div class="grid grid-cols-[3fr_7fr] ltr gap-1 relative">
          <X
            class="absolute right-[calc(100%-.3rem)] top-0 m-auto cursor-pointer text-destructive"
            onclick={() =>
              setStore("social", (prev) => prev.filter((_, ii) => ii !== i))
            }
          />

          <Input
            value={s.type}
            onchange={(e) =>
              setStore("social", i, "type", e.currentTarget.value)
            }
            placeholder="email, telegram, ..."
          />
          <Input
            value={s.link}
            onchange={(e) =>
              setStore("social", i, "link", e.currentTarget.value)
            }
            placeholder="example@gmail.com"
          />
        </div>
      ))}
      <Button
        variant="secondary"
        onclick={() =>
          setStore("social", (prev) => [...prev, { type: "", link: "" }])
        }
        size="sm"
      >
        <FiPlus />
        بیشتر...
      </Button>
    </>
  );
};

export default SocialLinkInputs;
