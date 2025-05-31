
import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ObjectivesStep: React.FC = () => {
  const { state, updateObjectivesData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled } = useOnboarding();
  const { objectivesData } = state;
  const { toast } = useToast();

  const mainObjectives = [
    { id: 'reduce-costs', label: 'Reduzir Custos' },
    { id: 'increase-revenue', label: 'Aumentar Receita' },
    { id: 'optimize-processes', label: 'Otimizar Processos' },
    { id: 'improve-customer-experience', label: 'Melhorar Experiência do Cliente' },
    { id: 'develop-new-products', label: 'Desenvolver Novos Produtos' },
    { id: 'expand-markets', label: 'Expandir Mercados' },
    { id: 'transform-digital', label: 'Transformação Digital' },
    { id: 'sustainability', label: 'Sustentabilidade' },
    { id: 'innovation', label: 'Inovação' },
    { id: 'other', label: 'Outro' }
  ];

  const priorityAreas = [
    { id: 'legal', label: 'Legal' },
    { id: 'hr', label: 'RH' },
    { id: 'growth', label: 'Crescimento' },
    { id: 'esg', label: 'ESG' },
    { id: 'sales', label: 'Vendas' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'finance', label: 'Finanças' },
    { id: 'operations', label: 'Operações' },
    { id: 'it', label: 'TI' },
    { id: 'innovation', label: 'Inovação' },
    { id: 'strategy', label: 'Estratégia' },
    { id: 'compliance', label: 'Compliance' }
  ];

  const handleObjectiveChange = (id: string, checked: boolean) => {
    let newObjectives = [...objectivesData.mainObjectives];
    
    if (checked) {
      newObjectives.push(id);
    } else {
      newObjectives = newObjectives.filter(item => item !== id);
    }
    
    updateObjectivesData({ mainObjectives: newObjectives });
  };

  const handlePriorityAreaChange = (id: string, checked: boolean) => {
    let newPriorityAreas = [...objectivesData.priorityAreas];
    
    if (checked) {
      newPriorityAreas.push(id);
    } else {
      newPriorityAreas = newPriorityAreas.filter(item => item !== id);
    }
    
    updateObjectivesData({ priorityAreas: newPriorityAreas });
  };

  const handleNextStep = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(2);
      setCurrentStep(3);
    } else {
      toast({
        title: "Seleção obrigatória",
        description: "Por favor, selecione ao menos uma área prioritária para IA",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="form-section">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nowgo-gray mb-2">Objetivos e Desafios</h2>
        <p className="text-muted-foreground text-lg">Defina os principais objetivos da sua empresa e áreas prioritárias para IA</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">Principais Objetivos</Label>
          <p className="text-sm text-muted-foreground mb-4">Selecione os objetivos estratégicos da sua empresa</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainObjectives.map(objective => (
              <div key={objective.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`objective-${objective.id}`}
                  checked={objectivesData.mainObjectives.includes(objective.id)}
                  onCheckedChange={(checked) => handleObjectiveChange(objective.id, checked === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={`objective-${objective.id}`}
                  className="text-sm font-medium leading-relaxed cursor-pointer flex-1"
                >
                  {objective.label}
                </Label>
              </div>
            ))}
          </div>
          
          {objectivesData.mainObjectives.includes('other') && (
            <div className="mt-4">
              <Label htmlFor="custom-objective" className="text-sm font-medium mb-2 block">
                Especifique outro objetivo
              </Label>
              <Input
                id="custom-objective"
                placeholder="Descreva outro objetivo estratégico"
                value={objectivesData.customObjective}
                onChange={(e) => updateObjectivesData({ customObjective: e.target.value })}
                className="max-w-md"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label htmlFor="challenges" className="text-lg font-semibold mb-4 block text-nowgo-gray">
            Principais Desafios
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            Descreva os principais desafios que sua empresa enfrenta atualmente
          </p>
          <Textarea
            id="challenges"
            placeholder="Ex: Dificuldade em análise de grandes volumes de dados, processos manuais demorados, falta de integração entre sistemas..."
            className="min-h-[120px] resize-none"
            value={objectivesData.challenges}
            onChange={(e) => updateObjectivesData({ challenges: e.target.value })}
          />
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">
            Áreas Prioritárias para IA *
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            Selecione as áreas onde a inteligência artificial pode ter maior impacto
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {priorityAreas.map(area => (
              <div key={area.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`priority-${area.id}`}
                  checked={objectivesData.priorityAreas.includes(area.id)}
                  onCheckedChange={(checked) => handlePriorityAreaChange(area.id, checked === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor={`priority-${area.id}`}
                  className="text-sm font-medium leading-relaxed cursor-pointer flex-1"
                >
                  {area.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(1)}
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

export default ObjectivesStep;
