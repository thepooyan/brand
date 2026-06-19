import { FiPlus } from "solid-icons/fi"
import X from "~/components/ui/x"
import { SetStoreFunction } from "solid-js/store"
import { TrainingData } from "~/db/schema"
import Input from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { InputChangeEvent } from "~/db/types"

interface p<T> {
  store: T
  setStore: SetStoreFunction<T>
}
const SocialLinkInputs = ({store, setStore}:p<TrainingData>) => {
  return (
    <div class="flex flex-col gap-1">
      {store.social.map((s, i) => (
        <div class="grid grid-cols-[3fr_7fr] ltr gap-1 relative">
          <X
            class="absolute  top-0 m-auto cursor-pointer text-destructive"
            onclick={() =>
              setStore("social", (prev) => prev.filter((_, ii) => ii !== i))
            }
          />

          <Input
            value={s.type}
            onchange={(e:InputChangeEvent) =>
              setStore("social", i, "type", e.currentTarget.value)
            }
            placeholder="email, telegram, ..."
            class="bg-muted text-muted-foreground"
          />
          <Input
            value={s.link}
            onchange={(e:InputChangeEvent) =>
              setStore("social", i, "link", e.currentTarget.value)
            }
            placeholder="example@gmail.com"
            class="bg-muted text-muted-foreground"
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
    </div>
  );
};

export default SocialLinkInputs;
