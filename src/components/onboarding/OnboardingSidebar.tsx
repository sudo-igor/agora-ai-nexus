
import React from 'react';
import { Building, Target, Database, User, Settings, Check } from 'lucide-react';
import { useOnboarding } from './OnboardingContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const OnboardingSidebar: React.FC = () => {
  const { state, setCurrentStep, isStepCompleted } = useOnboarding();
  const { currentStep } = state;

  const sidebarItems = [
    {
      id: 1,
      title: 'Empresa',
      icon: Building,
      description: 'Dados da organização'
    },
    {
      id: 2,
      title: 'Objetivos',
      icon: Target,
      description: 'Metas e desafios'
    },
    {
      id: 3,
      title: 'Infraestrutura',
      icon: Database,
      description: 'Ambiente digital'
    },
    {
      id: 4,
      title: 'Usuário',
      icon: User,
      description: 'Perfil do usuário'
    },
    {
      id: 5,
      title: 'Personalização',
      icon: Settings,
      description: 'Configuração do LLM'
    }
  ];

  const handleStepClick = (step: number) => {
    // Only allow navigation to completed steps or the current step + 1
    const allowedNextStep = Object.entries(state.stepsCompleted)
      .filter(([_, completed]) => completed)
      .length + 1;
    
    if (step <= allowedNextStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-nowgo-lightGray border-r border-border p-4 w-full max-w-[280px] hidden md:block">
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-nowgo-blue font-bold text-2xl">NowGoAI</h2>
        </div>
        <p className="text-nowgo-gray text-sm mb-4 text-center">Onboarding inteligente</p>
      </div>
      
      <div className="space-y-2">
        {sidebarItems.map(item => {
          // Calculate allowedNextStep inside the map function scope so it's available
          const allowedNextStep = Object.entries(state.stepsCompleted)
            .filter(([_, completed]) => completed)
            .length + 1;
            
          return (
            <button
              key={item.id}
              onClick={() => handleStepClick(item.id)}
              className={cn(
                "onboarding-sidebar-item w-full",
                currentStep === item.id && "active",
                isStepCompleted(item.id) ? "completed" : "pending"
              )}
              disabled={!isStepCompleted(item.id) && item.id > allowedNextStep}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full mr-3 bg-white text-nowgo-blue">
                {isStepCompleted(item.id) ? <Check size={16} /> : <item.icon size={16} />}
              </span>
              <div className="text-left">
                <div>{item.title}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
              
              {isStepCompleted(item.id) && (
                <Badge variant="outline" className="ml-auto bg-green-50 text-green-600 border-green-200">
                  <Check size={12} className="mr-1" /> Completo
                </Badge>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto pt-8">
        <div className="text-xs text-muted-foreground text-center">
          <p>NowGoAI © 2025</p>
          <p>Customizando LLMs para o seu negócio</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSidebar;
