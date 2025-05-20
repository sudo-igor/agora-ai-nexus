
import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight } from 'lucide-react';

const industryOptions = [
  'Tecnologia', 'Saúde', 'Finanças', 'Educação', 'Varejo', 
  'Logística', 'Manufatura', 'Serviços', 'Energia', 'Agricultura',
  'Construção', 'Mídia', 'Telecomunicações', 'Hotelaria', 'Outro'
];

const stageOptions = [
  'Ideação', 'Validação', 'Tração', 'Escala', 'Global'
];

const CompanyStep: React.FC = () => {
  const { state, updateCompanyData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled } = useOnboarding();
  const { companyData } = state;
  const { toast } = useToast();

  const handleNextStep = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(1);
      setCurrentStep(2);
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-nowgo-gray">Identificação da Empresa</h2>
        <p className="text-muted-foreground">Complete as informações sobre a sua organização</p>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="company-name">Nome da Empresa *</Label>
          <Input 
            id="company-name" 
            placeholder="Digite o nome da empresa" 
            value={companyData.name}
            onChange={(e) => updateCompanyData({ name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax-id">CNPJ / Tax ID *</Label>
          <Input 
            id="tax-id" 
            placeholder="00.000.000/0000-00" 
            value={companyData.taxId}
            onChange={(e) => updateCompanyData({ taxId: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="industry">Indústria / Setor *</Label>
          <Select
            value={companyData.industry}
            onValueChange={(value) => updateCompanyData({ industry: value })}
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              {industryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Número de Funcionários *</Label>
          <Select
            value={companyData.employees}
            onValueChange={(value) => updateCompanyData({ employees: value })}
          >
            <SelectTrigger id="employees">
              <SelectValue placeholder="Selecione o número" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-500">201-500</SelectItem>
              <SelectItem value="501-1000">501-1000</SelectItem>
              <SelectItem value="1000+">Mais de 1000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="country">País *</Label>
          <Input
            id="country"
            placeholder="País"
            value={companyData.country}
            onChange={(e) => updateCompanyData({ country: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado / Cidade</Label>
          <Input
            id="state"
            placeholder="Estado / Cidade"
            value={companyData.state}
            onChange={(e) => updateCompanyData({ state: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="stage">Estágio da Empresa *</Label>
          <Select
            value={companyData.stage}
            onValueChange={(value) => updateCompanyData({ stage: value })}
          >
            <SelectTrigger id="stage">
              <SelectValue placeholder="Selecione o estágio" />
            </SelectTrigger>
            <SelectContent>
              {stageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end justify-end">
          <Button
            onClick={handleNextStep}
            size="lg"
            className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white"
          >
            Continuar <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyStep;
