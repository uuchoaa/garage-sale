import { Button } from "@/components/catalyst/button";
import { Input, InputGroup } from "@/components/catalyst/input";
import { Avatar } from "@/components/catalyst/avatar";
import { useState } from "react";
import {
  Search,
  MessageCircle,
  AlertCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Message {
  id: number;
  sender: "buyer" | "me";
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  buyerName: string;
  buyerInitials: string;
  buyerColor: string;
  itemTitle: string;
  status: "unanswered" | "active" | "pickup_pending" | "archived";
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
  inconsistencyNote?: string;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    buyerName: "João Silva",
    buyerInitials: "JS",
    buyerColor: "bg-blue-500",
    itemTitle: "Sofá Cinza",
    status: "active",
    lastMessage: "Posso vir buscar amanhã?",
    lastMessageTime: "agora",
    messages: [
      { id: 1, sender: "buyer", text: "Oi, o sofá ainda está disponível?", timestamp: "10:30" },
      { id: 2, sender: "me", text: "Sim! Está em perfeito estado.", timestamp: "10:35" },
      { id: 3, sender: "buyer", text: "Qual é o preço final?", timestamp: "10:40" },
      { id: 4, sender: "me", text: "R$ 850. Aceito ofertas.", timestamp: "10:42" },
      { id: 5, sender: "buyer", text: "Posso vir buscar amanhã?", timestamp: "agora" },
    ],
  },
  {
    id: 2,
    buyerName: "Maria Santos",
    buyerInitials: "MS",
    buyerColor: "bg-green-500",
    itemTitle: "Guarda-roupa",
    status: "pickup_pending",
    lastMessage: "Confirmado para sábado às 14h",
    lastMessageTime: "há 2 horas",
    messages: [
      { id: 1, sender: "buyer", text: "Tenho interesse no guarda-roupa", timestamp: "ontem" },
      { id: 2, sender: "me", text: "Ótimo! Está disponível.", timestamp: "ontem" },
      { id: 3, sender: "buyer", text: "Posso vir sábado?", timestamp: "há 3 horas" },
      { id: 4, sender: "me", text: "Sim, qual horário?", timestamp: "há 2 horas" },
      { id: 5, sender: "buyer", text: "Confirmado para sábado às 14h", timestamp: "há 2 horas" },
    ],
    inconsistencyNote: "Disse sábado, depois mencionou domingo",
  },
  {
    id: 3,
    buyerName: "Pedro Costa",
    buyerInitials: "PC",
    buyerColor: "bg-purple-500",
    itemTitle: "Mesa de Café",
    status: "unanswered",
    lastMessage: "Qual é a altura da mesa?",
    lastMessageTime: "há 1 hora",
    messages: [
      { id: 1, sender: "buyer", text: "Qual é a altura da mesa?", timestamp: "há 1 hora" },
    ],
  },
];

const statusConfig = {
  unanswered: {
    label: "Sem resposta",
    icon: <AlertCircle size={16} />,
    color: "text-red-600 dark:text-red-400",
  },
  active: {
    label: "Ativo",
    icon: <MessageCircle size={16} />,
    color: "text-green-600 dark:text-green-400",
  },
  pickup_pending: {
    label: "Retirada pendente",
    icon: <Clock size={16} />,
    color: "text-zinc-500 dark:text-zinc-400",
  },
  archived: {
    label: "Arquivado",
    icon: <CheckCircle2 size={16} />,
    color: "text-zinc-500 dark:text-zinc-400",
  },
};

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [conversations] = useState(mockConversations);

  const filtered = conversations.filter(
    (conv) =>
      conv.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex -m-6 lg:-m-10 h-[calc(100vh-8rem)]">
      {/* Conversation List */}
      <div className="w-80 border-r border-zinc-950/5 dark:border-white/5 flex flex-col flex-shrink-0">
        <div className="border-b border-zinc-950/5 dark:border-white/5 px-4 py-4">
          <h1 className="text-sm font-semibold text-zinc-950 dark:text-white mb-3">Mensagens</h1>
          <InputGroup>
            <Search data-slot="icon" />
            <Input
              type="search"
              placeholder="Buscar conversa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="flex-1 overflow-auto">
          {filtered.map((conv) => {
            const config = statusConfig[conv.status];
            const isSelected = selectedConversation?.id === conv.id;

            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full text-left border-b border-zinc-950/5 dark:border-white/5 px-4 py-3 transition-colors ${
                  isSelected ? "bg-zinc-50 dark:bg-zinc-800/50" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar initials={conv.buyerInitials} className={`size-8 ${conv.buyerColor} text-white`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-950 dark:text-white truncate">{conv.buyerName}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{conv.itemTitle}</p>
                  </div>
                  <div className={`flex-shrink-0 ${config.color}`}>{config.icon}</div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mb-1">{conv.lastMessage}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{conv.lastMessageTime}</p>

                {conv.inconsistencyNote && (
                  <div className="mt-2 flex items-start gap-1.5 p-1.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle size={12} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600 dark:text-red-400">{conv.inconsistencyNote}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation View */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-b border-zinc-950/5 dark:border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                initials={selectedConversation.buyerInitials}
                className={`size-10 ${selectedConversation.buyerColor} text-white`}
              />
              <div>
                <p className="text-sm font-medium text-zinc-950 dark:text-white">{selectedConversation.buyerName}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedConversation.itemTitle}</p>
              </div>
            </div>

            <div className={`flex items-center gap-1.5 text-xs ${statusConfig[selectedConversation.status].color}`}>
              {statusConfig[selectedConversation.status].icon}
              <span>{statusConfig[selectedConversation.status].label}</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto px-6 py-4 space-y-3">
            {selectedConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === "me"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white border border-zinc-950/5 dark:border-white/5"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-white/60 dark:text-zinc-900/60" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-950/5 dark:border-white/5 px-6 py-4 space-y-2">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Escrever mensagem..."
                className="flex-1"
              />
              <Button>Enviar</Button>
            </div>

            <div className="flex gap-2">
              <Button outline className="flex-1">Agendar retirada</Button>
              <Button outline className="flex-1">Arquivar</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
          <p className="text-sm">Selecione uma conversa para começar</p>
        </div>
      )}
    </div>
  );
}
