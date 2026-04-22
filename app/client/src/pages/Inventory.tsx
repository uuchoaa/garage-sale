import { Button } from "@/components/catalyst/button";
import { Input, InputGroup } from "@/components/catalyst/input";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Select } from "@/components/catalyst/select";
import { Divider } from "@/components/catalyst/divider";
import { Page } from "@/components/ds";
import { useState } from "react";
import {
  Plus,
  Search,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  X,
} from "lucide-react";

interface Item {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  priority: "high" | "medium" | "low";
  status: "draft" | "available" | "reserved" | "sold" | "paused";
  conversations: number;
  whatsappReady: boolean;
  olxReady: boolean;
  lastUpdated: string;
}

const mockItems: Item[] = [
  {
    id: 1,
    title: "Sofá Cinza",
    subtitle: "base + almofadas",
    price: 850,
    priority: "high",
    status: "available",
    conversations: 3,
    whatsappReady: true,
    olxReady: true,
    lastUpdated: "hoje",
  },
  {
    id: 2,
    title: "Guarda-roupa",
    subtitle: "madeira maciça, 6 portas",
    price: 1200,
    priority: "high",
    status: "reserved",
    conversations: 2,
    whatsappReady: true,
    olxReady: true,
    lastUpdated: "ontem",
  },
  {
    id: 3,
    title: "Mesa de Café",
    subtitle: "vidro + metal",
    price: 300,
    priority: "medium",
    status: "available",
    conversations: 1,
    whatsappReady: true,
    olxReady: false,
    lastUpdated: "2 dias",
  },
  {
    id: 4,
    title: "Ar Condicionado",
    subtitle: "12.000 BTU, 2 anos",
    price: 1500,
    priority: "high",
    status: "draft",
    conversations: 0,
    whatsappReady: false,
    olxReady: false,
    lastUpdated: "agora",
  },
  {
    id: 5,
    title: "Cama Queen",
    subtitle: "base + colchão",
    price: 2000,
    priority: "high",
    status: "sold",
    conversations: 5,
    whatsappReady: true,
    olxReady: true,
    lastUpdated: "3 dias",
  },
];

const statusLabels = {
  draft: "Rascunho",
  available: "Disponível",
  reserved: "Reservado",
  sold: "Vendido",
  paused: "Pausado",
};

const statusClasses = {
  draft:     "text-muted-foreground italic border-border",
  available: "text-status-success border-status-success-border",
  reserved:  "text-muted-foreground border-border",
  sold:      "text-muted-foreground border-border line-through",
  paused:    "text-muted-foreground border-border",
};

const priorityClasses = {
  high:   "bg-status-danger-subtle text-status-danger",
  medium: "bg-muted text-muted-foreground",
  low:    "bg-muted text-muted-foreground opacity-60",
};

const priorityLabels = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

export default function Inventory() {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "expensive" | "drafts">("recent");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  let filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "expensive") return b.price - a.price;
    if (sortBy === "drafts") return a.status === "draft" ? -1 : 1;
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? filtered.map((item) => item.id) : []);
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems(checked ? [...selectedItems, id] : selectedItems.filter((i) => i !== id));
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setShowDrawer(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)));
      setShowDrawer(false);
      setEditingItem(null);
    }
  };

  const draftCount = items.filter((i) => i.status === "draft").length;
  const soldCount = items.filter((i) => i.status === "sold").length;
  const reservedCount = items.filter((i) => i.status === "reserved").length;
  const availableCount = items.filter((i) => i.status === "available").length;

  return (
    <Page>
      <Page.Header
        title="Estoque"
        actions={
          <>
            <Button outline disabled={selectedItems.length === 0}>Ações em lote</Button>
            <Button>
              <Plus data-slot="icon" />
              Adicionar itens
            </Button>
          </>
        }
      />

      <p className="text-sm text-muted-foreground mb-6 space-x-4">
        <span><span className="font-medium text-foreground">{items.length}</span> itens</span>
        <span><span className="font-medium text-foreground">{soldCount}</span> vendidos</span>
        <span><span className="font-medium text-foreground">{reservedCount}</span> reservados</span>
        <span><span className="font-medium text-foreground">{availableCount}</span> disponíveis</span>
        <span><span className="font-medium text-foreground">{draftCount}</span> rascunhos</span>
      </p>

      <div className="flex items-center gap-3 flex-wrap mb-6">
        <div className="flex-1 min-w-48">
          <InputGroup>
            <Search data-slot="icon" />
            <Input
              type="search"
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>

        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="draft">Rascunho</option>
          <option value="available">Disponível</option>
          <option value="reserved">Reservado</option>
          <option value="sold">Vendido</option>
        </Select>

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="recent">Recentes</option>
          <option value="expensive">Mais caros</option>
          <option value="drafts">Rascunhos primeiro</option>
        </Select>
      </div>

      <Divider />

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-3 text-left font-medium text-muted-foreground w-8">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filtered.length && filtered.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="cursor-pointer rounded"
                />
              </th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Foto</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Item</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Preço</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Prioridade</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Interesse</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Pronto para</th>
              <th className="px-3 py-3 text-left font-medium text-muted-foreground">Atualizado</th>
              <th className="px-3 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleEditItem(item)}
              >
                <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    className="cursor-pointer rounded"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="w-8 h-8 bg-muted rounded-lg"></div>
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{item.subtitle}</p>
                </td>
                <td className="px-3 py-3 font-mono text-foreground">
                  R$ {item.price.toLocaleString("pt-BR")}
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded ${priorityClasses[item.priority]}`}>
                    {priorityLabels[item.priority]}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 border rounded ${statusClasses[item.status]}`}>
                    {statusLabels[item.status]}
                  </span>
                </td>
                <td className="px-3 py-3 text-foreground">
                  {item.conversations > 0 ? (
                    <span className="text-xs font-medium">{item.conversations} conversa{item.conversations > 1 ? "s" : ""}</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    {item.whatsappReady && <CheckCircle2 size={14} className="text-status-success" />}
                    {!item.olxReady && item.status !== "draft" && (
                      <AlertCircle size={14} className="text-status-danger" />
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 text-muted-foreground text-xs">{item.lastUpdated}</td>
                <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                  <button className="p-1 hover:bg-muted rounded-lg">
                    <MoreVertical size={14} className="text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Drawer */}
      {showDrawer && editingItem && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setShowDrawer(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-card border-l border-border shadow-xl flex flex-col">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Editar item</h2>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-auto px-6 py-4 space-y-6">
              <Field>
                <Label>Título</Label>
                <Input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                />
              </Field>

              <Field>
                <Label>Descrição</Label>
                <Input
                  type="text"
                  value={editingItem.subtitle}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                />
              </Field>

              <Field>
                <Label>Preço</Label>
                <Input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                />
              </Field>

              <Field>
                <Label>Status</Label>
                <Select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as Item["status"] })}
                >
                  <option value="draft">Rascunho</option>
                  <option value="available">Disponível</option>
                  <option value="reserved">Reservado</option>
                  <option value="sold">Vendido</option>
                </Select>
              </Field>

              <Field>
                <Label>Prioridade</Label>
                <Select
                  value={editingItem.priority}
                  onChange={(e) => setEditingItem({ ...editingItem, priority: e.target.value as Item["priority"] })}
                >
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </Select>
              </Field>
            </div>

            <div className="border-t border-border px-6 py-4 flex gap-2">
              <Button onClick={handleSaveItem} className="flex-1">Salvar</Button>
              <Button outline onClick={() => setShowDrawer(false)} className="flex-1">Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
