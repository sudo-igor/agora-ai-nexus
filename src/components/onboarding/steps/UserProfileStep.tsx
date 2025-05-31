
import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, User, Shield, MessageSquare, Brain } from 'lucide-react';

const UserProfileStep: React.FC = () => {
  const { state, updateUserProfileData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled } = useOnboarding();
  const { userProfileData } = state;
  const { toast } = useToast();

  const accessLevels = [
    { 
      value: 'admin', 
      label: 'Admin', 
      description: 'Acesso completo a todas as funcionalidades',
      icon: Shield
    },
    { 
      value: 'manager', 
      label: 'Manager', 
      description: 'Acesso a relatórios e gestão de equipe',
      icon: User
    },
    { 
      value: 'contributor', 
      label: 'Contributor', 
      description: 'Acesso às funcionalidades básicas',
      icon: User
    }
  ];

  const languageStyles = [
    { 
      value: 'formal', 
      label: 'Formal', 
      description: 'Linguagem corporativa e protocolar',
      example: '"Prezado usuário, gostaríamos de informar..."'
    },
    { 
      value: 'direct', 
      label: 'Direto', 
      description: 'Comunicação objetiva e clara',
      example: '"Aqui estão os dados solicitados:"'
    },
    { 
      value: 'empathetic', 
      label: 'Empático', 
      description: 'Tom acolhedor e compreensivo',
      example: '"Entendo sua necessidade, vou ajudar você..."'
    },
    { 
      value: 'casual', 
      label: 'Casual', 
      description: 'Linguagem descontraída e amigável',
      example: '"Oi! Vamos resolver isso juntos?"'
    }
  ];

  const responseDepths = [
    { 
      value: 'simple', 
      label: 'Simples', 
      description: 'Respostas diretas e concisas',
      details: 'Ideal para decisões rápidas'
    },
    { 
      value: 'technical', 
      label: 'Técnico', 
      description: 'Detalhes técnicos e específicos',
      details: 'Para análises especializadas'
    },
    { 
      value: 'strategic', 
      label: 'Estratégico', 
      description: 'Visão de negócio e contexto amplo',
      details: 'Para tomada de decisões estratégicas'
    },
    { 
      value: 'deep', 
      label: 'Análise Profunda', 
      description: 'Análise completa com múltiplas perspectivas',
      details: 'Para estudos detalhados e relatórios'
    }
  ];

  const departments = [
    'Executivo', 'Vendas', 'Marketing', 'Finanças', 'RH', 'TI', 'Operações', 
    'Legal', 'Produto', 'Atendimento', 'Estratégia', 'Inovação', 'Outro'
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nowgo-gray mb-2">Perfil do Usuário</h2>
        <p className="text-muted-foreground text-lg">Configure o perfil do usuário principal para personalização da IA</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Informações Básicas</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full-name" className="text-sm font-medium">Nome Completo *</Label>
              <Input 
                id="full-name" 
                placeholder="Digite seu nome completo" 
                value={userProfileData.fullName}
                onChange={(e) => updateUserProfileData({ fullName: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">Cargo *</Label>
              <Input 
                id="position" 
                placeholder="Ex: Diretor de Vendas, Analista de Marketing" 
                value={userProfileData.position}
                onChange={(e) => updateUserProfileData({ position: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">Departamento *</Label>
              <Select
                value={userProfileData.department}
                onValueChange={(value) => updateUserProfileData({ department: value })}
              >
                <SelectTrigger id="department" className="h-11">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept.toLowerCase()}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="access-level" className="text-sm font-medium">Nível de Acesso *</Label>
              <Select
                value={userProfileData.accessLevel}
                onValueChange={(value) => updateUserProfileData({ accessLevel: value })}
              >
                <SelectTrigger id="access-level" className="h-11">
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <level.icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-muted-foreground">{level.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Preferências de Comunicação</Label>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="language-style" className="text-sm font-medium">Estilo de Linguagem</Label>
              <Select
                value={userProfileData.languageStyle}
                onValueChange={(value) => updateUserProfileData({ languageStyle: value })}
              >
                <SelectTrigger id="language-style" className="h-11">
                  <SelectValue placeholder="Selecione o estilo preferido" />
                </SelectTrigger>
                <SelectContent>
                  {languageStyles.map(style => (
                    <SelectItem key={style.value} value={style.value}>
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-xs text-muted-foreground">{style.description}</div>
                        <div className="text-xs text-nowgo-blue italic mt-1">{style.example}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Preferências de Análise</Label>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="response-depth" className="text-sm font-medium">Profundidade das Respostas</Label>
            <Select
              value={userProfileData.responseDepth}
              onValueChange={(value) => updateUserProfileData({ responseDepth: value })}
            >
              <SelectTrigger id="response-depth" className="h-11">
                <SelectValue placeholder="Selecione o nível de detalhe" />
              </SelectTrigger>
              <SelectContent>
                {responseDepths.map(depth => (
                  <SelectItem key={depth.value} value={depth.value}>
                    <div>
                      <div className="font-medium">{depth.label}</div>
                      <div className="text-xs text-muted-foreground">{depth.description}</div>
                      <div className="text-xs text-nowgo-blue">{depth.details}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(3)}
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

export default UserProfileStep;
