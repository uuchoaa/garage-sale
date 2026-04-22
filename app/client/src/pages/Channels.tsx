import { Button } from "@/components/catalyst/button";
import { Page, Card, StatusPill, Alert } from "@/components/ds";
import {
  Clock,
  Link2,
  MessageCircle,
  ShoppingCart,
  Instagram,
  Facebook,
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "connected" | "needs_auth" | "suspended" | "quota_exceeded" | "not_connected";
  postedItems: number;
  activeConversations: number;
  lastActivity: string;
  contactCount?: number;
  quotaInfo?: string;
  groups?: string[];
}

const channelPillVariant: Record<string, "success" | "danger" | "warning" | "neutral"> = {
  connected: "success",
  needs_auth: "danger",
  suspended: "danger",
  quota_exceeded: "warning",
  not_connected: "neutral",
}
const channelPillLabel: Record<string, string> = {
  connected: "Conectado",
  needs_auth: "Reautenticar",
  suspended: "Suspenso",
  quota_exceeded: "Cota esgotada",
  not_connected: "Não conectado",
}

const channels: Channel[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <MessageCircle size={20} />,
    status: "connected",
    postedItems: 12,
    activeConversations: 8,
    lastActivity: "agora",
    contactCount: 47,
    groups: ["Família", "Amigos da faculdade", "Pais da escola"],
  },
  {
    id: "olx",
    name: "OLX",
    icon: <ShoppingCart size={20} />,
    status: "connected",
    postedItems: 8,
    activeConversations: 5,
    lastActivity: "há 2 horas",
    quotaInfo: "3/5 anúncios gratuitos usados",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram size={20} />,
    status: "needs_auth",
    postedItems: 0,
    activeConversations: 0,
    lastActivity: "nunca",
  },
  {
    id: "mercado_livre",
    name: "Mercado Livre",
    icon: <ShoppingCart size={20} />,
    status: "not_connected",
    postedItems: 0,
    activeConversations: 0,
    lastActivity: "nunca",
  },
  {
    id: "facebook",
    name: "Facebook Marketplace",
    icon: <Facebook size={20} />,
    status: "not_connected",
    postedItems: 0,
    activeConversations: 0,
    lastActivity: "nunca",
  },
];

export default function Channels() {
  return (
    <Page>
      <Page.Header
        title="Canais"
        description="Gerencie suas conexões e veja o status de cada canal de publicação."
      />

      <div className="space-y-4">
        {channels.map((channel) => {
          const isConnected = channel.status === "connected";

          return (
            <Card key={channel.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-foreground">{channel.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{channel.name}</h3>
                    <div className="mt-1">
                      <StatusPill variant={channelPillVariant[channel.status]}>{channelPillLabel[channel.status]}</StatusPill>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isConnected ? (
                    <>
                      <Button outline>Configurar</Button>
                      <Button outline>Desconectar</Button>
                    </>
                  ) : (
                    <Button>Conectar</Button>
                  )}
                </div>
              </div>

              {isConnected && (
                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Itens publicados</p>
                    <p className="text-sm font-medium text-foreground">{channel.postedItems}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Conversas ativas</p>
                    <p className="text-sm font-medium text-foreground">{channel.activeConversations}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Última atividade</p>
                    <p className="text-sm font-medium text-foreground">{channel.lastActivity}</p>
                  </div>
                  {channel.contactCount && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contatos</p>
                      <p className="text-sm font-medium text-foreground">{channel.contactCount}</p>
                    </div>
                  )}
                </div>
              )}

              {channel.id === "whatsapp" && channel.groups && (
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Grupos para divulgação</p>
                  <div className="space-y-1">
                    {channel.groups.map((group) => (
                      <div key={group} className="flex items-center justify-between text-xs">
                        <span className="text-foreground">• {group}</span>
                        <Button plain>Enviar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {channel.id === "olx" && channel.quotaInfo && (
                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Cota de anúncios</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-foreground/30 rounded-full" />
                    </div>
                    <span className="text-xs text-muted-foreground">{channel.quotaInfo}</span>
                  </div>
                </div>
              )}

              {channel.status === "needs_auth" && (
                <Alert variant="danger">
                  Sua autenticação expirou. Reconecte para continuar publicando.
                </Alert>
              )}

              {channel.status === "not_connected" && (
                <Alert variant="muted">
                  Conecte este canal para começar a publicar.
                </Alert>
              )}
            </Card>
          );
        })}
      </div>
    </Page>
  );
}
