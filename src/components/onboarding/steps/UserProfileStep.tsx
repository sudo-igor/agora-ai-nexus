
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
      description: 'Full access to all features',
      icon: Shield
    },
    { 
      value: 'manager', 
      label: 'Manager', 
      description: 'Access to reports and team management',
      icon: User
    },
    { 
      value: 'contributor', 
      label: 'Contributor', 
      description: 'Access to basic features',
      icon: User
    }
  ];

  const languageStyles = [
    { 
      value: 'formal', 
      label: 'Formal', 
      description: 'Corporate and protocol language',
      example: '"Dear user, we would like to inform..."'
    },
    { 
      value: 'direct', 
      label: 'Direct', 
      description: 'Objective and clear communication',
      example: '"Here is the requested data:"'
    },
    { 
      value: 'empathetic', 
      label: 'Empathetic', 
      description: 'Welcoming and understanding tone',
      example: '"I understand your need, I will help you..."'
    },
    { 
      value: 'casual', 
      label: 'Casual', 
      description: 'Relaxed and friendly language',
      example: '"Hi! Let\'s solve this together?"'
    }
  ];

  const responseDepths = [
    { 
      value: 'simple', 
      label: 'Simple', 
      description: 'Direct and concise responses',
      details: 'Ideal for quick decisions'
    },
    { 
      value: 'technical', 
      label: 'Technical', 
      description: 'Technical and specific details',
      details: 'For specialized analysis'
    },
    { 
      value: 'strategic', 
      label: 'Strategic', 
      description: 'Business vision and broad context',
      details: 'For strategic decision making'
    },
    { 
      value: 'deep', 
      label: 'Deep Analysis', 
      description: 'Complete analysis with multiple perspectives',
      details: 'For detailed studies and reports'
    }
  ];

  const departments = [
    'Executive', 'Sales', 'Marketing', 'Finance', 'HR', 'IT', 'Operations', 
    'Legal', 'Product', 'Customer Service', 'Strategy', 'Innovation', 'Other'
  ];

  const handleNextStep = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(4);
      setCurrentStep(5);
    } else {
      toast({
        title: "Required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="form-section">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nowgo-gray mb-2">User Profile</h2>
        <p className="text-muted-foreground text-lg">Configure the main user profile for AI personalization</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Basic Information</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full-name" className="text-sm font-medium">Full Name *</Label>
              <Input 
                id="full-name" 
                placeholder="Enter your full name" 
                value={userProfileData.fullName}
                onChange={(e) => updateUserProfileData({ fullName: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">Position *</Label>
              <Input 
                id="position" 
                placeholder="E.g., Sales Director, Marketing Analyst" 
                value={userProfileData.position}
                onChange={(e) => updateUserProfileData({ position: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium">Department *</Label>
              <Select
                value={userProfileData.department}
                onValueChange={(value) => updateUserProfileData({ department: value })}
              >
                <SelectTrigger id="department" className="h-11">
                  <SelectValue placeholder="Select department" />
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
              <Label htmlFor="access-level" className="text-sm font-medium">Access Level *</Label>
              <Select
                value={userProfileData.accessLevel}
                onValueChange={(value) => updateUserProfileData({ accessLevel: value })}
              >
                <SelectTrigger id="access-level" className="h-11">
                  <SelectValue placeholder="Select level" />
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
            <Label className="text-lg font-semibold text-nowgo-gray">Communication Preferences</Label>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="language-style" className="text-sm font-medium">Language Style</Label>
              <Select
                value={userProfileData.languageStyle}
                onValueChange={(value) => updateUserProfileData({ languageStyle: value })}
              >
                <SelectTrigger id="language-style" className="h-11">
                  <SelectValue placeholder="Select preferred style" />
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
            <Label className="text-lg font-semibold text-nowgo-gray">Analysis Preferences</Label>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="response-depth" className="text-sm font-medium">Response Depth</Label>
            <Select
              value={userProfileData.responseDepth}
              onValueChange={(value) => updateUserProfileData({ responseDepth: value })}
            >
              <SelectTrigger id="response-depth" className="h-11">
                <SelectValue placeholder="Select detail level" />
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
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        
        <Button
          onClick={handleNextStep}
          className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white flex items-center gap-2"
        >
          Continue <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserProfileStep;
