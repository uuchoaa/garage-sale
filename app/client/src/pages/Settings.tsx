import { Button } from "@/components/catalyst/button";
import { Input } from "@/components/catalyst/input";
import { Field, FieldGroup, Label, Description } from "@/components/catalyst/fieldset";
import { Select } from "@/components/catalyst/select";
import { Checkbox, CheckboxField } from "@/components/catalyst/checkbox";
import { Page, Card, AlertBanner } from "@/components/ds";
import { useState } from "react";
import { Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    sellerName: "Seu Nome",
    phone: "(11) 98765-4321",
    location: "Pinheiros, São Paulo",
    moveDate: "2026-05-04",
    acceptOffers: true,
    autoArchiveAfterDays: 7,
    defaultPriority: "medium",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Page>
      <Page.Header
        title="Configurações"
        description="Gerencie suas preferências e informações pessoais."
      />

      <div className="max-w-2xl space-y-6">
        {saved && (
          <AlertBanner variant="success">Configurações salvas com sucesso.</AlertBanner>
        )}

        <Card>
          <h2 className="text-sm font-semibold mb-6">Perfil</h2>
          <FieldGroup>
            <Field>
              <Label>Seu nome</Label>
              <Input
                type="text"
                value={settings.sellerName}
                onChange={(e) => setSettings({ ...settings, sellerName: e.target.value })}
              />
            </Field>
            <Field>
              <Label>Telefone</Label>
              <Input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </Field>
            <Field>
              <Label>Localização</Label>
              <Input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              />
            </Field>
            <Field>
              <Label>Data da mudança</Label>
              <Input
                type="date"
                value={settings.moveDate}
                onChange={(e) => setSettings({ ...settings, moveDate: e.target.value })}
              />
            </Field>
          </FieldGroup>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold mb-6">Preferências de venda</h2>
          <div className="space-y-6">
            <CheckboxField>
              <Checkbox
                checked={settings.acceptOffers}
                onChange={(checked) => setSettings({ ...settings, acceptOffers: checked })}
              />
              <Label>Aceitar ofertas</Label>
              <Description>Compradores podem fazer contrapropostas</Description>
            </CheckboxField>

            <Field>
              <Label>Arquivar itens após (dias sem interesse)</Label>
              <Description>
                Itens sem conversas serão marcados como "pausa" após este período.
              </Description>
              <Input
                type="number"
                value={settings.autoArchiveAfterDays}
                onChange={(e) =>
                  setSettings({ ...settings, autoArchiveAfterDays: Number(e.target.value) })
                }
              />
            </Field>

            <Field>
              <Label>Prioridade padrão</Label>
              <Select
                value={settings.defaultPriority}
                onChange={(e) => setSettings({ ...settings, defaultPriority: e.target.value })}
              >
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </Select>
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold mb-6">Dados e privacidade</h2>
          <div className="space-y-3">
            <AlertBanner variant="muted">
              Seus dados são armazenados localmente no navegador. Nada é enviado para servidores externos.
            </AlertBanner>
            <Button outline className="w-full">Exportar dados</Button>
            <Button color="red" className="w-full">Limpar tudo</Button>
          </div>
        </Card>

        <div>
          <Button onClick={handleSave} color="dark" className="w-full">
            <Save data-slot="icon" />
            Salvar configurações
          </Button>
        </div>
      </div>
    </Page>
  );
}
