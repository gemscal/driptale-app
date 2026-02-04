import * as React from "react";
import { Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiImageIcon,
  Bug02Icon,
  BulbIcon,
  Megaphone01Icon,
  PackageIcon,
  TShirtIcon,
  ClipboardIcon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";

import { NavUser } from "@/components/sidebar/user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { User } from "firebase/auth";

const menuItems = {
  navMain: [
    {
      title: "Platform",
      url: "#",
      items: [
        {
          title: "Generate Outfit",
          url: "/",
          icon: <HugeiconsIcon icon={AiImageIcon} strokeWidth={2} />,
        },
        {
          title: "Wardrobe",
          url: "/wardrobe",
          icon: <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />,
        },
        {
          title: "Outfits",
          url: "/outfits",
          icon: <HugeiconsIcon icon={TShirtIcon} strokeWidth={2} />,
        },
        {
          title: "Favorites",
          url: "/favorites",
          icon: <HugeiconsIcon icon={FavouriteIcon} strokeWidth={2} />,
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: { user: User } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser
          user={{
            name: user.displayName!,
            email: user.email!,
            avatar: user.photoURL!,
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        {menuItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        activeProps={{
                          className: "bg-sidebar-accent",
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Gallery</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="outline">
                    <HugeiconsIcon icon={ClipboardIcon} strokeWidth={2} />
                    Add Gallery
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="text-muted-foreground">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HugeiconsIcon icon={Bug02Icon} strokeWidth={2} />
              <span>Report a Bug</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HugeiconsIcon icon={Megaphone01Icon} strokeWidth={2} />
              <span>Send Feedback</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HugeiconsIcon icon={BulbIcon} strokeWidth={2} />
              <span>Feature Request</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
