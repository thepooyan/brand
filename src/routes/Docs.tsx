import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLocation } from "@solidjs/router"
import { ParentProps } from "solid-js"

const Docs = ({children}:ParentProps) => {

  const location = useLocation()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        }
      }
      class="ltr"
    >
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="!h-8 mx-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {location.pathname.split("/").slice(0, -1).map((s,i) => <>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href={`${location.pathname.split("/").slice(0, i+1).join("/")}`}>
                    {s}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
              </>)}

              <BreadcrumbItem>
                {location.pathname.split("/").at(-1)}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div class="prose dark:prose-invert mx-auto p-8 rtl">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
)}

export default Docs
