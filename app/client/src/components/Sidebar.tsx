import { useLocation } from "wouter";
import { LayoutDashboard, Package, Radio, MessageSquare, Settings, LogOut } from "lucide-react";
import {
  Sidebar as CatalystSidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/catalyst/sidebar";

const navItems = [
  { label: "Painel", href: "/", icon: LayoutDashboard },
  { label: "Estoque", href: "/inventory", icon: Package },
  { label: "Canais", href: "/channels", icon: Radio },
  { label: "Mensagens", href: "/messages", icon: MessageSquare },
  { label: "Configurações", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <CatalystSidebar>
      <SidebarHeader>
        <div className="px-2 py-2">
          <h1 className="text-base font-semibold tracking-tight">Garage Sale</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Pinheiros, SP</p>
        </div>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarItem key={item.href} href={item.href} current={location === item.href}>
                <Icon data-slot="icon" />
                <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarItem>
            );
          })}
        </SidebarSection>
      </SidebarBody>

      <SidebarFooter>
        <SidebarSection>
          <SidebarItem>
            <LogOut data-slot="icon" />
            <SidebarLabel>Sair</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarFooter>
    </CatalystSidebar>
  );
}
