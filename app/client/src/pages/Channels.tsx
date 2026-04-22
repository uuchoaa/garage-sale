import { Button } from "@/components/catalyst/button";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Link2,
  MessageCircle,
  ShoppingCart,
  Instagram,
  Facebook,
  AlertTriangle,
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

const statusConfig = {
  connected: {
    label: "Conectado",
    color: "text-green-600 dark:text-green-400",
    icon: <CheckCircle2 size={16} />,
  },
  needs_auth: {
    label: "Reautenticar",
    color: "text-red-600 dark:text-red-400",
    icon: <AlertTriangle size={16} />,
  },
  suspended: {
    label: "Suspenso",
    color: "text-red-600 dark:text-red-400",
    icon: <AlertCircle size={16} />,
  },
  quota_exceeded: {
    label: "Cota excedida",
    color: "text-red-600 dark:text-red-400",
    icon: <AlertCircle size={16} />,
  },
  not_connected: {
    label: "Não conectado",
    color: "text-zinc-500 dark:text-zinc-400",
    icon: <Link2 size={16} />,
  },
};

export default function Channels() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Canais</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gerencie suas conexões e veja o status de cada canal de publicação.
        </p>
      </div>

      <div className="space-y-4">
        {channels.map((channel) => {
          const config = statusConfig[channel.status];
          const isConnected = channel.status === "connected";

          return (
            <div
              key={channel.id}
              className="border border-zinc-950/5 dark:border-white/5 rounded-lg p-6 bg-white dark:bg-zinc-900 shadow-xs"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-zinc-950 dark:text-white">{channel.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">{channel.name}</h3>
                    <div className={`flex items-center gap-1.5 mt-1 text-xs ${config.color}`}>
                      {config.icon}
                      <span>{config.label}</span>
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
                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-zinc-950/5 dark:border-white/5">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Itens publicados</p>
                    <p className="text-sm font-medium text-zinc-950 dark:text-white">{channel.postedItems}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Conversas ativas</p>
                    <p className="text-sm font-medium text-zinc-950 dark:text-white">{channel.activeConversations}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Última atividade</p>
                    <p className="text-sm font-medium text-zinc-950 dark:text-white">{channel.lastActivity}</p>
                  </div>
                  {channel.contactCount && (
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Contatos</p>
                      <p className="text-sm font-medium text-zinc-950 dark:text-white">{channel.contactCount}</p>
                    </div>
                  )}
                </div>
              )}

              {channel.id === "whatsapp" && channel.groups && (
                <div>
                  <p className="text-xs font-medium text-zinc-950 dark:text-white mb-2">Grupos para divulgação</p>
                  <div className="space-y-1">
                    {channel.groups.map((group) => (
                      <div key={group} className="flex items-center justify-between text-xs">
                        <span className="text-zinc-950 dark:text-white">• {group}</span>
                        <Button plain>Enviar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {channel.id === "olx" && channel.quotaInfo && (
                <div>
                  <p className="text-xs font-medium text-zinc-950 dark:text-white mb-2">Cota de anúncios</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-zinc-900 dark:bg-white rounded-full" />
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{channel.quotaInfo}</span>
                  </div>
                </div>
              )}

              {channel.status === "needs_auth" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertTriangle size={14} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">
                    Sua autenticação expirou. Reconecte para continuar publicando.
                  </p>
                </div>
              )}

              {channel.status === "not_connected" && (
                <div className="flex items-center gap-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <Clock size={14} className="text-zinc-500 flex-shrink-0" />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Conecte este canal para começar a publicar.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
