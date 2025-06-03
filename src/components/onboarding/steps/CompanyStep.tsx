
import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight } from 'lucide-react';

const industryOptions = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 
  'Logistics', 'Manufacturing', 'Services', 'Energy', 'Agriculture',
  'Construction', 'Media', 'Telecommunications', 'Hospitality', 'Other'
];

const stageOptions = [
  'Ideation', 'Validation', 'Traction', 'Scale', 'Global'
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
        title: "Required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-nowgo-gray">Company Information</h2>
        <p className="text-muted-foreground">Complete the information about your organization</p>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name *</Label>
          <Input 
            id="company-name" 
            placeholder="Enter company name" 
            value={companyData.name}
            onChange={(e) => updateCompanyData({ name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax-id">Tax ID / Registration Number *</Label>
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
          <Label htmlFor="industry">Industry / Sector *</Label>
          <Select
            value={companyData.industry}
            onValueChange={(value) => updateCompanyData({ industry: value })}
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
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
          <Label htmlFor="employees">Number of Employees *</Label>
          <Select
            value={companyData.employees}
            onValueChange={(value) => updateCompanyData({ employees: value })}
          >
            <SelectTrigger id="employees">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-500">201-500</SelectItem>
              <SelectItem value="501-1000">501-1000</SelectItem>
              <SelectItem value="1000+">More than 1000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            placeholder="Country"
            value={companyData.country}
            onChange={(e) => updateCompanyData({ country: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State / City</Label>
          <Input
            id="state"
            placeholder="State / City"
            value={companyData.state}
            onChange={(e) => updateCompanyData({ state: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="stage">Company Stage *</Label>
          <Select
            value={companyData.stage}
            onValueChange={(value) => updateCompanyData({ stage: value })}
          >
            <SelectTrigger id="stage">
              <SelectValue placeholder="Select stage" />
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
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyStep;
