import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { FiBook } from "solid-icons/fi"
import { ComponentProps } from "solid-js"

type nav = {
  title: string
  url: string
  isActive?: boolean
  items?: nav[]
}
const navMain:nav[] = [
    {
      title: "چت بات",
      url: "/docs/chat-bot",
      items: [
        {
          title: "ساخت چت بات جدید",
          url: "/docs/chat-bot/create",
        },
        {
          title: "دریافت توکن",
          url: "/docs/chat-bot/token",
        },
        {
          title: "استفاده از توکن",
          url: "/docs/chat-bot/api",
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
            <SidebarMenuButton size="lg" class="rtl">
                <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <FiBook/>
                </div>
                <div class="flex flex-col gap-0.5 leading-none text-right">
                  <span class="font-medium">مستندات</span>
                  <span class="text-muted-foreground text-sm">نسخه ۱.۰.۰</span>
                </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent class="rtl">
        <SidebarGroup>
          <SidebarMenu class="gap-2">
            {navMain.map((item) => (
              <SidebarMenuItem >
                <SidebarMenuButton>
                  <a href={item.url} class="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub class="ml-0 border-l-0 px-1.5">
                    {item.items.length > 0 && item.items.map((item) => (
                      <SidebarMenuSubItem >
                        <SidebarMenuSubButton isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

