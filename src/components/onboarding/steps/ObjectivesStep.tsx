
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

  const objectives = [
    { id: 'reduce-costs', label: 'Reduzir Custos' },
    { id: 'increase-revenue', label: 'Aumentar Receita' },
    { id: 'optimize-processes', label: 'Otimizar Processos' },
    { id: 'improve-customer-experience', label: 'Melhorar Experiência do Cliente' },
    { id: 'develop-new-products', label: 'Desenvolver Novos Produtos' },
    { id: 'expand-markets', label: 'Expandir Mercados' },
    { id: 'transform-digital', label: 'Transformação Digital' },
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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-nowgo-gray">Objetivos e Desafios</h2>
        <p className="text-muted-foreground">Defina os principais objetivos da sua empresa e áreas prioritárias para IA</p>
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Principais Objetivos</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {objectives.map(objective => (
            <div key={objective.id} className="flex items-start space-x-2">
              <Checkbox
                id={`objective-${objective.id}`}
                checked={objectivesData.mainObjectives.includes(objective.id)}
                onCheckedChange={(checked) => handleObjectiveChange(objective.id, checked === true)}
              />
              <Label
                htmlFor={`objective-${objective.id}`}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {objective.label}
              </Label>
            </div>
          ))}
        </div>
        {objectivesData.mainObjectives.includes('other') && (
          <div className="mt-2">
            <Input
              placeholder="Descreva outro objetivo"
              value={objectivesData.customObjective}
              onChange={(e) => updateObjectivesData({ customObjective: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="form-full-row">
        <Label htmlFor="challenges" className="mb-2 block">Principais Desafios</Label>
        <Textarea
          id="challenges"
          placeholder="Descreva os principais desafios que sua empresa enfrenta atualmente"
          className="min-h-[100px]"
          value={objectivesData.challenges}
          onChange={(e) => updateObjectivesData({ challenges: e.target.value })}
        />
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Áreas Prioritárias para IA *</Label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {priorityAreas.map(area => (
            <div key={area.id} className="flex items-start space-x-2">
              <Checkbox
                id={`priority-${area.id}`}
                checked={objectivesData.priorityAreas.includes(area.id)}
                onCheckedChange={(checked) => handlePriorityAreaChange(area.id, checked === true)}
              />
              <Label
                htmlFor={`priority-${area.id}`}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {area.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(1)}
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

export default ObjectivesStep;
