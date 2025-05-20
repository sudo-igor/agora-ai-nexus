
import React from 'react';
import { useOnboarding } from './OnboardingContext';
import CompanyStep from './steps/CompanyStep';
import ObjectivesStep from './steps/ObjectivesStep';
import InfrastructureStep from './steps/InfrastructureStep';
import UserProfileStep from './steps/UserProfileStep';
import PersonalizationStep from './steps/PersonalizationStep';
import Dashboard from '../dashboard/Dashboard';

const OnboardingStepper: React.FC = () => {
  const { state } = useOnboarding();
  const { currentStep } = state;

  // Render the current step component based on the currentStep value
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyStep />;
      case 2:
        return <ObjectivesStep />;
      case 3:
        return <InfrastructureStep />;
      case 4:
        return <UserProfileStep />;
      case 5:
        return <PersonalizationStep />;
      case 6:
        return <Dashboard />;
      default:
        return <CompanyStep />;
    }
  };

  return (
    <div className="w-full">
      {renderStep()}
    </div>
  );
};

export default OnboardingStepper;
