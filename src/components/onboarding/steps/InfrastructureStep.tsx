
import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const InfrastructureStep: React.FC = () => {
  const { state, updateInfrastructureData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled } = useOnboarding();
  const { infrastructureData } = state;
  const { toast } = useToast();

  const toolsUsed = [
    { id: 'crm', label: 'CRM (Salesforce, HubSpot, Pipedrive)', category: 'Vendas' },
    { id: 'erp', label: 'ERP (SAP, Oracle, Totvs)', category: 'Gestão' },
    { id: 'spreadsheets', label: 'Planilhas (Excel, Google Sheets)', category: 'Análise' },
    { id: 'bi', label: 'BI Tools (Power BI, Tableau, Looker)', category: 'Análise' },
    { id: 'project-management', label: 'Gestão de Projetos (Asana, Monday, Jira)', category: 'Produtividade' },
    { id: 'accounting', label: 'Contabilidade (QuickBooks, Xero)', category: 'Financeiro' },
    { id: 'hr-tools', label: 'RH (BambooHR, Workday)', category: 'Recursos Humanos' },
    { id: 'other', label: 'Outras ferramentas', category: 'Outros' }
  ];

  const databaseTypes = [
    { id: 'sql', label: 'SQL Server', description: 'Microsoft SQL Server' },
    { id: 'mysql', label: 'MySQL', description: 'Sistema de gerenciamento open source' },
    { id: 'postgresql', label: 'PostgreSQL', description: 'Banco de dados relacional avançado' },
    { id: 'mongodb', label: 'MongoDB', description: 'Banco de dados NoSQL' },
    { id: 'oracle', label: 'Oracle', description: 'Sistema empresarial da Oracle' },
    { id: 'firebase', label: 'Firebase', description: 'Plataforma do Google' },
    { id: 'none', label: 'Nenhum banco específico', description: 'Apenas arquivos ou planilhas' }
  ];

  const apiIntegrations = [
    { id: 'zapier', label: 'Zapier', description: 'Automação de workflows' },
    { id: 'hubspot', label: 'HubSpot', description: 'CRM e Marketing' },
    { id: 'notion', label: 'Notion', description: 'Workspace colaborativo' },
    { id: 'power-bi', label: 'Power BI', description: 'Business Intelligence' },
    { id: 'google-analytics', label: 'Google Analytics', description: 'Análise web' },
    { id: 'slack', label: 'Slack', description: 'Comunicação empresarial' },
    { id: 'microsoft-teams', label: 'Microsoft Teams', description: 'Colaboração Microsoft' },
    { id: 'salesforce', label: 'Salesforce', description: 'CRM empresarial' },
    { id: 'other', label: 'Outras integrações', description: 'APIs customizadas' }
  ];

  const maturityLevels = [
    { 
      id: 'beginner', 
      label: 'Iniciante', 
      description: 'Processos principalmente manuais, poucos sistemas digitais',
      details: 'Planilhas, e-mails, documentos físicos'
    },
    { 
      id: 'intermediate', 
      label: 'Intermediário', 
      description: 'Alguns sistemas implementados, mas não integrados',
      details: 'CRM, ERP básico, algumas automações'
    },
    { 
      id: 'advanced', 
      label: 'Avançado', 
      description: 'Sistemas integrados com análise de dados',
      details: 'APIs, dashboards, processos automatizados'
    },
    { 
      id: 'expert', 
      label: 'Especialista', 
      description: 'Transformação digital completa e orientada por dados',
      details: 'IA, machine learning, análise preditiva'
    }
  ];

  const handleToolChange = (id: string, checked: boolean) => {
    let newTools = [...infrastructureData.toolsUsed];
    
    if (checked) {
      newTools.push(id);
    } else {
      newTools = newTools.filter(item => item !== id);
    }
    
    updateInfrastructureData({ toolsUsed: newTools });
  };

  const handleDatabaseChange = (id: string, checked: boolean) => {
    let newDatabases = [...infrastructureData.databaseType];
    
    if (checked) {
      newDatabases.push(id);
    } else {
      newDatabases = newDatabases.filter(item => item !== id);
    }
    
    updateInfrastructureData({ databaseType: newDatabases });
  };

  const handleIntegrationChange = (id: string, checked: boolean) => {
    let newIntegrations = [...infrastructureData.apiIntegrations];
    
    if (checked) {
      newIntegrations.push(id);
    } else {
      newIntegrations = newIntegrations.filter(item => item !== id);
    }
    
    updateInfrastructureData({ apiIntegrations: newIntegrations });
  };

  const handleNextStep = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(3);
      setCurrentStep(4);
    } else {
      toast({
        title: "Seleção obrigatória",
        description: "Por favor, selecione o nível de maturidade digital",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="form-section">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nowgo-gray mb-2">Infraestrutura Digital</h2>
        <p className="text-muted-foreground text-lg">Nos conte sobre o ambiente digital da sua empresa</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">Ferramentas Utilizadas</Label>
          <p className="text-sm text-muted-foreground mb-4">Selecione as principais ferramentas que sua empresa utiliza</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolsUsed.map(tool => (
              <div key={tool.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`tool-${tool.id}`}
                  checked={infrastructureData.toolsUsed.includes(tool.id)}
                  onCheckedChange={(checked) => handleToolChange(tool.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`tool-${tool.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer block"
                  >
                    {tool.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{tool.category}</span>
                </div>
              </div>
            ))}
          </div>
          
          {infrastructureData.toolsUsed.includes('other') && (
            <div className="mt-4">
              <Label htmlFor="custom-tool" className="text-sm font-medium mb-2 block">
                Especifique outras ferramentas
              </Label>
              <Input
                id="custom-tool"
                placeholder="Descreva outras ferramentas utilizadas"
                value={infrastructureData.customTool}
                onChange={(e) => updateInfrastructureData({ customTool: e.target.value })}
                className="max-w-md"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">Tipo de Banco de Dados</Label>
          <p className="text-sm text-muted-foreground mb-4">Selecione os bancos de dados utilizados</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {databaseTypes.map(db => (
              <div key={db.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`db-${db.id}`}
                  checked={infrastructureData.databaseType.includes(db.id)}
                  onCheckedChange={(checked) => handleDatabaseChange(db.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`db-${db.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer block"
                  >
                    {db.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{db.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">Integrações API</Label>
          <p className="text-sm text-muted-foreground mb-4">Selecione as integrações existentes ou planejadas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiIntegrations.map(integration => (
              <div key={integration.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`integration-${integration.id}`}
                  checked={infrastructureData.apiIntegrations.includes(integration.id)}
                  onCheckedChange={(checked) => handleIntegrationChange(integration.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`integration-${integration.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer block"
                  >
                    {integration.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{integration.description}</span>
                </div>
              </div>
            ))}
          </div>
          
          {infrastructureData.apiIntegrations.includes('other') && (
            <div className="mt-4">
              <Label htmlFor="custom-integration" className="text-sm font-medium mb-2 block">
                Especifique outras integrações
              </Label>
              <Input
                id="custom-integration"
                placeholder="Descreva outras integrações ou APIs utilizadas"
                value={infrastructureData.customIntegration}
                onChange={(e) => updateInfrastructureData({ customIntegration: e.target.value })}
                className="max-w-md"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">
            Nível de Maturidade Digital *
          </Label>
          <p className="text-sm text-muted-foreground mb-6">
            Avalie o nível atual de digitalização da sua empresa
          </p>
          <RadioGroup
            value={infrastructureData.digitalMaturityLevel}
            onValueChange={(value) => updateInfrastructureData({ digitalMaturityLevel: value })}
            className="space-y-4"
          >
            {maturityLevels.map(level => (
              <div key={level.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:border-nowgo-blue/30 transition-colors">
                <RadioGroupItem value={level.id} id={`maturity-${level.id}`} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={`maturity-${level.id}`} className="font-semibold text-base cursor-pointer block">
                    {level.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                  <p className="text-xs text-nowgo-blue mt-2">{level.details}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(2)}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar
        </Button>
        
        <Button
          onClick={handleNextStep}
          className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white flex items-center gap-2"
        >
          Continuar <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default InfrastructureStep;
