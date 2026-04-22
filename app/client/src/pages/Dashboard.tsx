import { Button } from "@/components/catalyst/button";
import { Page, Card } from "@/components/ds";
import { CheckCircle2, Clock, DollarSign, Package } from "lucide-react";
import { useState } from "react";

const mockUrgentQueue = [
  {
    id: 1,
    type: "payment",
    description: "João Silva aguardando confirmação de pagamento",
    action: "Confirmar pagamento",
    priority: "high",
  },
  {
    id: 2,
    type: "message",
    description: "Maria Santos respondeu sobre o sofá",
    action: "Responder",
    priority: "medium",
  },
  {
    id: 3,
    type: "stale",
    description: "Guarda-roupa sem interesse há 5 dias",
    action: "Enviar nudge",
    priority: "low",
  },
];

const mockTodayPickups = [
  {
    id: 1,
    time: "14:00",
    buyer: "João Silva",
    items: ["Sofá cinza", "Mesa de café"],
    total: 850,
    status: "confirmed",
  },
  {
    id: 2,
    time: "16:30",
    buyer: "Maria Santos",
    items: ["Guarda-roupa", "Espelho"],
    total: 1200,
    status: "pending_payment",
  },
];

export default function Dashboard() {
  const [completedActions, setCompletedActions] = useState<number[]>([]);

  const daysUntilMove = 12;
  const itemsSold = 8;
  const totalItems = 15;
  const totalReceived = 3850;
  const totalAgreed = 6200;

  const handleActionComplete = (id: number) => {
    setCompletedActions([...completedActions, id]);
  };

  const visibleQueue = mockUrgentQueue.filter((item) => !completedActions.includes(item.id));

  return (
    <Page>
      <Page.Header title="Painel" />

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{daysUntilMove}</span> dias até a mudança
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Package size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{itemsSold}</span>/{totalItems} itens vendidos
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">R$ {totalReceived.toLocaleString("pt-BR")}</span> recebido
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">R$ {totalAgreed.toLocaleString("pt-BR")}</span> acordado
          </span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-foreground/30 rounded-full transition-all duration-300"
          style={{ width: `${(itemsSold / totalItems) * 100}%` }}
        />
      </div>

      <div className="space-y-8">
        {/* Pra fazer agora */}
        <section>
          <h2 className="text-sm font-semibold mb-4">Pra fazer agora</h2>

          {visibleQueue.length === 0 ? (
            <Card>
              <div className="py-4 text-center">
                <CheckCircle2 size={32} className="mx-auto mb-3 text-status-success" />
                <p className="text-sm text-muted-foreground">Nada urgente agora</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-2">
              {visibleQueue.map((item) => (
                <Card key={item.id} className="py-4 px-4 flex items-center justify-between">
                  <p className="text-sm text-foreground flex-1">{item.description}</p>
                  <Button onClick={() => handleActionComplete(item.id)} outline>
                    {item.action}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Hoje */}
        <section>
          <h2 className="text-sm font-semibold mb-4">Hoje</h2>

          {mockTodayPickups.length === 0 ? (
            <Card>
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma retirada agendada para hoje
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {mockTodayPickups.map((pickup) => (
                <Card key={pickup.id}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{pickup.buyer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pickup.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground font-mono">
                        R$ {pickup.total.toLocaleString("pt-BR")}
                      </p>
                      <span
                        className={`inline-block text-xs px-2 py-0.5 rounded mt-1 ${
                          pickup.status === "confirmed"
                            ? "bg-status-success-subtle text-status-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {pickup.status === "confirmed" ? "Confirmado" : "Pendente"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Itens:</p>
                    <ul className="text-sm text-foreground space-y-0.5">
                      {pickup.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Marcar retirado</Button>
                    <Button outline className="flex-1">Reagendar</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </Page>
  );
}
