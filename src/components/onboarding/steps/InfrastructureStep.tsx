
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

  const tools = [
    { id: 'crm', label: 'CRM (Salesforce, etc)' },
    { id: 'erp', label: 'ERP (SAP, etc)' },
    { id: 'spreadsheets', label: 'Planilhas' },
    { id: 'bi', label: 'BI Tools' },
    { id: 'project-management', label: 'Gestão de Projetos' },
    { id: 'other', label: 'Outro' }
  ];

  const databases = [
    { id: 'sql', label: 'SQL' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'oracle', label: 'Oracle' },
    { id: 'mysql', label: 'MySQL' },
    { id: 'firebase', label: 'Firebase' },
    { id: 'none', label: 'Nenhum' },
  ];

  const integrations = [
    { id: 'zapier', label: 'Zapier' },
    { id: 'hubspot', label: 'HubSpot' },
    { id: 'notion', label: 'Notion' },
    { id: 'power-bi', label: 'Power BI' },
    { id: 'google-analytics', label: 'Google Analytics' },
    { id: 'slack', label: 'Slack' },
    { id: 'microsoft-teams', label: 'Microsoft Teams' },
    { id: 'other', label: 'Outro' }
  ];

  const maturityLevels = [
    { id: 'beginner', label: 'Iniciante', description: 'Começando a jornada digital' },
    { id: 'intermediate', label: 'Intermediário', description: 'Sistemas implementados, mas não totalmente integrados' },
    { id: 'advanced', label: 'Avançado', description: 'Sistemas integrados com análise de dados' },
    { id: 'expert', label: 'Especialista', description: 'Transformação digital completa e orientada por dados' }
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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-nowgo-gray">Infraestrutura Digital</h2>
        <p className="text-muted-foreground">Nos conte sobre o ambiente digital da sua empresa</p>
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Ferramentas Utilizadas</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {tools.map(tool => (
            <div key={tool.id} className="flex items-start space-x-2">
              <Checkbox
                id={`tool-${tool.id}`}
                checked={infrastructureData.toolsUsed.includes(tool.id)}
                onCheckedChange={(checked) => handleToolChange(tool.id, checked === true)}
              />
              <Label
                htmlFor={`tool-${tool.id}`}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tool.label}
              </Label>
            </div>
          ))}
        </div>
        {infrastructureData.toolsUsed.includes('other') && (
          <div className="mt-2 mb-4">
            <Input
              placeholder="Especifique outras ferramentas"
              value={infrastructureData.customTool}
              onChange={(e) => updateInfrastructureData({ customTool: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Tipo de Banco de Dados</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {databases.map(db => (
            <div key={db.id} className="flex items-start space-x-2">
              <Checkbox
                id={`db-${db.id}`}
                checked={infrastructureData.databaseType.includes(db.id)}
                onCheckedChange={(checked) => handleDatabaseChange(db.id, checked === true)}
              />
              <Label
                htmlFor={`db-${db.id}`}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {db.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Integrações API</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {integrations.map(integration => (
            <div key={integration.id} className="flex items-start space-x-2">
              <Checkbox
                id={`integration-${integration.id}`}
                checked={infrastructureData.apiIntegrations.includes(integration.id)}
                onCheckedChange={(checked) => handleIntegrationChange(integration.id, checked === true)}
              />
              <Label
                htmlFor={`integration-${integration.id}`}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {integration.label}
              </Label>
            </div>
          ))}
        </div>
        {infrastructureData.apiIntegrations.includes('other') && (
          <div className="mt-2 mb-4">
            <Input
              placeholder="Especifique outras integrações"
              value={infrastructureData.customIntegration}
              onChange={(e) => updateInfrastructureData({ customIntegration: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="form-full-row">
        <Label className="mb-4 block">Nível de Maturidade Digital *</Label>
        <RadioGroup
          value={infrastructureData.digitalMaturityLevel}
          onValueChange={(value) => updateInfrastructureData({ digitalMaturityLevel: value })}
          className="space-y-4"
        >
          {maturityLevels.map(level => (
            <div key={level.id} className="flex items-center space-x-2">
              <RadioGroupItem value={level.id} id={`maturity-${level.id}`} />
              <Label htmlFor={`maturity-${level.id}`} className="font-medium">
                {level.label}
                <span className="block text-sm text-muted-foreground font-normal">{level.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(2)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        <Button
          onClick={handleNextStep}
          className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white"
        >
          Continuar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InfrastructureStep;
