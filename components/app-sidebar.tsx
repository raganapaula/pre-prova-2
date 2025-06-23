"use client"

import type * as React from "react"
import { Frame, GraduationCap, Map, PieChart, Users, UserPlus, List, Home } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin",
    email: "admin@escola.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Sistema Escolar",
      logo: GraduationCap,
      plan: "Educação",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Estudantes",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Cadastrar",
          url: "/students/create",
          icon: UserPlus,
        },
        {
          title: "Listar",
          url: "/students",
          icon: List,
        },
      ],
    },
    {
      title: "Relatórios",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Estatísticas",
          url: "/reports",
        },
        {
          title: "Gráficos",
          url: "/charts",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Turma A",
      url: "#",
      icon: Frame,
    },
    {
      name: "Turma B",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Turma C",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
