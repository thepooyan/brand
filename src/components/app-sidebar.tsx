import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { A } from "@solidjs/router"
import { FiBook, FiHome } from "solid-icons/fi"
import { ComponentProps } from "solid-js"

export type docsNav = {
  title: string
  url: string
  isActive?: boolean
  items?: docsNav[]
}
export const docsChatNav:docsNav[] = [
    {
      title: "چت بات",
      url: "/docs/chat-bot",
      items: [
        {
          title: "ساخت چت بات جدید",
          url: "/docs/chat-bot/create",
        },
       {
          title: "استفاده از api",
          url: "/docs/chat-bot/api",
        },
       {
          title: "مثال استفاده از api (javascript)",
          url: "/docs/chat-bot/example-js",
        },
       {
          title: "اتصال به تلگرام",
          url: "/docs/chat-bot/telegram",
        },
       {
          title: "ویجت",
          url: "/docs/chat-bot/widget",
        },
      ],
    },
  ]

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" class="rtl flex justify-between">
              <div class="flex gap-2">

                <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <FiBook/>
                </div>
                <div class="flex flex-col gap-0.5 leading-none text-right">
                  <span class="font-medium">مستندات</span>
                  <span class="text-muted-foreground text-sm">نسخه ۲.۱.۳</span>
                </div>
              </div>
              <A href="/" class="hover:bg-white hover:text-black p-2 transition-colors rounded cursor-pointer flex justify-center items-center">
                <FiHome />
              </A>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent class="rtl">
        <SidebarGroup>
          <SidebarGroupLabel>هوش مصنوعی</SidebarGroupLabel>
          <SidebarMenu class="gap-2">
            {docsChatNav.map((item) => (
              <SidebarMenuItem >
                <SidebarMenuButton>
                  <a href={item.url} class="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length && (
                  <SidebarMenuSub class="ml-0 border-l-0 px-1.5">
                    {item.items.length > 0 && item.items.map((item) => (
                      <SidebarMenuSubItem >
                        <SidebarMenuSubButton isActive={item.isActive} as="A" href={item.url}>
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
