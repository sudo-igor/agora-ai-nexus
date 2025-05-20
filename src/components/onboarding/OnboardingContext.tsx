
import React, { createContext, useContext, useState } from 'react';

// Types for our onboarding data
export interface CompanyData {
  name: string;
  taxId: string;
  industry: string;
  country: string;
  state: string;
  employees: string;
  stage: string;
}

export interface ObjectivesData {
  mainObjectives: string[];
  customObjective: string;
  challenges: string;
  priorityAreas: string[];
}

export interface InfrastructureData {
  toolsUsed: string[];
  customTool: string;
  databaseType: string[];
  apiIntegrations: string[];
  customIntegration: string;
  digitalMaturityLevel: string;
}

export interface UserProfileData {
  fullName: string;
  position: string;
  department: string;
  accessLevel: string;
  languageStyle: string;
  responseDepth: string;
}

export interface PersonalizationData {
  documentUrls: string[];
  documentUploads: File[];
  llmRole: string;
  primaryFocus: string[];
}

export interface OnboardingState {
  currentStep: number;
  companyData: CompanyData;
  objectivesData: ObjectivesData;
  infrastructureData: InfrastructureData;
  userProfileData: UserProfileData;
  personalizationData: PersonalizationData;
  stepsCompleted: Record<number, boolean>;
}

interface OnboardingContextType {
  state: OnboardingState;
  setCurrentStep: (step: number) => void;
  updateCompanyData: (data: Partial<CompanyData>) => void;
  updateObjectivesData: (data: Partial<ObjectivesData>) => void;
  updateInfrastructureData: (data: Partial<InfrastructureData>) => void;
  updateUserProfileData: (data: Partial<UserProfileData>) => void;
  updatePersonalizationData: (data: Partial<PersonalizationData>) => void;
  markStepCompleted: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  allRequiredFieldsFilled: () => boolean;
  generateDashboard: () => void;
}

const defaultState: OnboardingState = {
  currentStep: 1,
  companyData: {
    name: '',
    taxId: '',
    industry: '',
    country: '',
    state: '',
    employees: '',
    stage: '',
  },
  objectivesData: {
    mainObjectives: [],
    customObjective: '',
    challenges: '',
    priorityAreas: [],
  },
  infrastructureData: {
    toolsUsed: [],
    customTool: '',
    databaseType: [],
    apiIntegrations: [],
    customIntegration: '',
    digitalMaturityLevel: '',
  },
  userProfileData: {
    fullName: '',
    position: '',
    department: '',
    accessLevel: '',
    languageStyle: '',
    responseDepth: '',
  },
  personalizationData: {
    documentUrls: [''],
    documentUploads: [],
    llmRole: '',
    primaryFocus: [],
  },
  stepsCompleted: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }
};

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(defaultState);

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const updateCompanyData = (data: Partial<CompanyData>) => {
    setState(prev => ({
      ...prev,
      companyData: { ...prev.companyData, ...data }
    }));
  };

  const updateObjectivesData = (data: Partial<ObjectivesData>) => {
    setState(prev => ({
      ...prev,
      objectivesData: { ...prev.objectivesData, ...data }
    }));
  };

  const updateInfrastructureData = (data: Partial<InfrastructureData>) => {
    setState(prev => ({
      ...prev,
      infrastructureData: { ...prev.infrastructureData, ...data }
    }));
  };

  const updateUserProfileData = (data: Partial<UserProfileData>) => {
    setState(prev => ({
      ...prev,
      userProfileData: { ...prev.userProfileData, ...data }
    }));
  };

  const updatePersonalizationData = (data: Partial<PersonalizationData>) => {
    setState(prev => ({
      ...prev,
      personalizationData: { ...prev.personalizationData, ...data }
    }));
  };

  const markStepCompleted = (step: number) => {
    setState(prev => ({
      ...prev,
      stepsCompleted: { ...prev.stepsCompleted, [step]: true }
    }));
  };

  const isStepCompleted = (step: number) => {
    return state.stepsCompleted[step];
  };

  // Check if all required fields are filled based on the current step
  const allRequiredFieldsFilled = () => {
    switch (state.currentStep) {
      case 1:
        const { name, taxId, industry, country, employees, stage } = state.companyData;
        return !!(name && taxId && industry && country && employees && stage);
      case 2:
        const { priorityAreas } = state.objectivesData;
        return priorityAreas.length > 0;
      case 3:
        const { digitalMaturityLevel } = state.infrastructureData;
        return !!digitalMaturityLevel;
      case 4:
        const { fullName, position, department, accessLevel } = state.userProfileData;
        return !!(fullName && position && department && accessLevel);
      case 5:
        const { llmRole, primaryFocus } = state.personalizationData;
        return !!(llmRole && primaryFocus.length > 0);
      default:
        return false;
    }
  };

  const generateDashboard = () => {
    // Mark all steps as completed
    setState(prev => ({
      ...prev,
      stepsCompleted: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true
      },
      currentStep: 6 // Move to dashboard view
    }));
  };

  return (
    <OnboardingContext.Provider value={{
      state,
      setCurrentStep,
      updateCompanyData,
      updateObjectivesData,
      updateInfrastructureData,
      updateUserProfileData,
      updatePersonalizationData,
      markStepCompleted,
      isStepCompleted,
      allRequiredFieldsFilled,
      generateDashboard
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
