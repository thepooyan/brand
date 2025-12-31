// import { GalleryVerticalEnd } from "lucide-react"

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

const data = {
  navMain: [
    {
      title: "چت بات",
      url: "/Docs/chatbot",
      items: [
        {
          title: "ساخت چت بات جدید",
          url: "/Docs/chatbot/create",
        },
        {
          title: "دریافت توکن",
          url: "/Docs/chatbot/token",
        },
        {
          title: "استفاده از توکن",
          url: "/Docs/chatbot/api",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
                <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <div class="bg-zinc-900 p-3 rounded-full flex items-center justify-center mr-3">
                    <FiBook/>
                  </div>
                </div>
                <div class="flex flex-col gap-0.5 leading-none">
                  <span class="font-medium">Documentation</span>
                  <span class="">v1.0.0</span>
                </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu class="gap-2">
            {data.navMain.map((item) => (
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

