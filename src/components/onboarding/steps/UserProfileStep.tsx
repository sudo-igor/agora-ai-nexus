
import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const UserProfileStep: React.FC = () => {
  const { state, updateUserProfileData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled } = useOnboarding();
  const { userProfileData } = state;
  const { toast } = useToast();

  const accessLevels = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'contributor', label: 'Contributor' }
  ];

  const languageStyles = [
    { value: 'formal', label: 'Formal' },
    { value: 'direct', label: 'Direto' },
    { value: 'empathetic', label: 'Empático' },
    { value: 'casual', label: 'Casual' }
  ];

  const responseDepths = [
    { value: 'simple', label: 'Simples' },
    { value: 'technical', label: 'Técnico' },
    { value: 'strategic', label: 'Estratégico' },
    { value: 'deep', label: 'Análise Profunda' }
  ];

  const handleNextStep = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(4);
      setCurrentStep(5);
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
        <h2 className="text-2xl font-semibold text-nowgo-gray">Perfil do Usuário</h2>
        <p className="text-muted-foreground">Configure o perfil do usuário principal</p>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="full-name">Nome Completo *</Label>
          <Input 
            id="full-name" 
            placeholder="Digite seu nome completo" 
            value={userProfileData.fullName}
            onChange={(e) => updateUserProfileData({ fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Cargo *</Label>
          <Input 
            id="position" 
            placeholder="Seu cargo atual" 
            value={userProfileData.position}
            onChange={(e) => updateUserProfileData({ position: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="department">Departamento *</Label>
          <Input 
            id="department" 
            placeholder="Seu departamento" 
            value={userProfileData.department}
            onChange={(e) => updateUserProfileData({ department: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="access-level">Nível de Acesso *</Label>
          <Select
            value={userProfileData.accessLevel}
            onValueChange={(value) => updateUserProfileData({ accessLevel: value })}
          >
            <SelectTrigger id="access-level">
              <SelectValue placeholder="Selecione o nível" />
            </SelectTrigger>
            <SelectContent>
              {accessLevels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="language-style">Estilo de Linguagem</Label>
          <Select
            value={userProfileData.languageStyle}
            onValueChange={(value) => updateUserProfileData({ languageStyle: value })}
          >
            <SelectTrigger id="language-style">
              <SelectValue placeholder="Selecione o estilo" />
            </SelectTrigger>
            <SelectContent>
              {languageStyles.map(style => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="response-depth">Profundidade das Respostas</Label>
          <Select
            value={userProfileData.responseDepth}
            onValueChange={(value) => updateUserProfileData({ responseDepth: value })}
          >
            <SelectTrigger id="response-depth">
              <SelectValue placeholder="Selecione a profundidade" />
            </SelectTrigger>
            <SelectContent>
              {responseDepths.map(depth => (
                <SelectItem key={depth.value} value={depth.value}>
                  {depth.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(3)}
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

export default UserProfileStep;
