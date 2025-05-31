
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
    // Allow navigation to any step - let the user explore the form
    // The validation will happen when they try to proceed to the next step
    setCurrentStep(step);
  };

  const isStepAccessible = (stepId: number) => {
    // Step 1 is always accessible
    if (stepId === 1) return true;
    
    // Allow access to the next step after the last completed step
    const completedSteps = Object.entries(state.stepsCompleted)
      .filter(([_, completed]) => completed)
      .map(([step, _]) => parseInt(step));
    
    const maxCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : 0;
    
    // Allow access to completed steps + one more step ahead
    return stepId <= maxCompletedStep + 1;
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
          const isAccessible = isStepAccessible(item.id);
          const isActive = currentStep === item.id;
          const isCompleted = isStepCompleted(item.id);
            
          return (
            <button
              key={item.id}
              onClick={() => handleStepClick(item.id)}
              className={cn(
                "onboarding-sidebar-item w-full",
                isActive && "active",
                isCompleted ? "completed" : "pending",
                !isAccessible && "opacity-50 cursor-not-allowed"
              )}
              disabled={!isAccessible}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full mr-3 bg-white text-nowgo-blue">
                {isCompleted ? <Check size={16} /> : <item.icon size={16} />}
              </span>
              <div className="text-left">
                <div>{item.title}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
              
              {isCompleted && (
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
