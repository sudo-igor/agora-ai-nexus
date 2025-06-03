import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const InfrastructureStep: React.FC = () => {
  const { state, updateInfrastructureData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled } = useOnboarding();
  const { infrastructureData } = state;
  const { toast } = useToast();

  const toolsUsed = [
    { id: 'crm', label: 'CRM (Salesforce, HubSpot, Pipedrive)', category: 'Sales' },
    { id: 'erp', label: 'ERP (SAP, Oracle, Totvs)', category: 'Management' },
    { id: 'spreadsheets', label: 'Spreadsheets (Excel, Google Sheets)', category: 'Analysis' },
    { id: 'bi', label: 'BI Tools (Power BI, Tableau, Looker)', category: 'Analysis' },
    { id: 'project-management', label: 'Project Management (Asana, Monday, Jira)', category: 'Productivity' },
    { id: 'accounting', label: 'Accounting (QuickBooks, Xero)', category: 'Financial' },
    { id: 'hr-tools', label: 'HR (BambooHR, Workday)', category: 'Human Resources' },
    { id: 'other', label: 'Other tools', category: 'Others' }
  ];

  const databaseTypes = [
    { id: 'sql', label: 'SQL Server', description: 'Microsoft SQL Server' },
    { id: 'mysql', label: 'MySQL', description: 'Open source management system' },
    { id: 'postgresql', label: 'PostgreSQL', description: 'Advanced relational database' },
    { id: 'mongodb', label: 'MongoDB', description: 'NoSQL database' },
    { id: 'oracle', label: 'Oracle', description: 'Oracle enterprise system' },
    { id: 'firebase', label: 'Firebase', description: 'Google platform' },
    { id: 'none', label: 'No specific database', description: 'Only files or spreadsheets' }
  ];

  const apiIntegrations = [
    { id: 'zapier', label: 'Zapier', description: 'Workflow automation' },
    { id: 'hubspot', label: 'HubSpot', description: 'CRM and Marketing' },
    { id: 'notion', label: 'Notion', description: 'Collaborative workspace' },
    { id: 'power-bi', label: 'Power BI', description: 'Business Intelligence' },
    { id: 'google-analytics', label: 'Google Analytics', description: 'Web analytics' },
    { id: 'slack', label: 'Slack', description: 'Business communication' },
    { id: 'microsoft-teams', label: 'Microsoft Teams', description: 'Microsoft collaboration' },
    { id: 'salesforce', label: 'Salesforce', description: 'Enterprise CRM' },
    { id: 'other', label: 'Other integrations', description: 'Custom APIs' }
  ];

  const maturityLevels = [
    { 
      id: 'beginner', 
      label: 'Beginner', 
      description: 'Mainly manual processes, few digital systems',
      details: 'Spreadsheets, emails, physical documents'
    },
    { 
      id: 'intermediate', 
      label: 'Intermediate', 
      description: 'Some systems implemented but not integrated',
      details: 'CRM, basic ERP, some automation'
    },
    { 
      id: 'advanced', 
      label: 'Advanced', 
      description: 'Integrated systems with data analysis',
      details: 'APIs, dashboards, automated processes'
    },
    { 
      id: 'expert', 
      label: 'Expert', 
      description: 'Complete digital transformation and data-driven',
      details: 'AI, machine learning, predictive analytics'
    }
  ];

  const handleToolChange = (id: string, checked: boolean) => {
    let newTools = [...infrastructureData.toolsUsed];
    
    if (checked) {
      newTools.push(id);
    } else {
      newTools = newTools.filter(item => item !== id);
    }
    
    updateInfrastructureData({ toolsUsed: newTools });
  };

  const handleDatabaseChange = (id: string, checked: boolean) => {
    let newDatabases = [...infrastructureData.databaseType];
    
    if (checked) {
      newDatabases.push(id);
    } else {
      newDatabases = newDatabases.filter(item => item !== id);
    }
    
    updateInfrastructureData({ databaseType: newDatabases });
  };

  const handleIntegrationChange = (id: string, checked: boolean) => {
    let newIntegrations = [...infrastructureData.apiIntegrations];
    
    if (checked) {
      newIntegrations.push(id);
    } else {
      newIntegrations = newIntegrations.filter(item => item !== id);
    }
    
    updateInfrastructureData({ apiIntegrations: newIntegrations });
  };

  const handleNextStep = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(3);
      setCurrentStep(4);
    } else {
      toast({
        title: "Required selection",
        description: "Please select the digital maturity level",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="form-section">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nowgo-gray mb-2">Digital Infrastructure</h2>
        <p className="text-muted-foreground text-lg">Tell us about your company's digital environment</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">Tools Used</Label>
          <p className="text-sm text-muted-foreground mb-4">Select the main tools your company uses</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolsUsed.map(tool => (
              <div key={tool.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`tool-${tool.id}`}
                  checked={infrastructureData.toolsUsed.includes(tool.id)}
                  onCheckedChange={(checked) => handleToolChange(tool.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`tool-${tool.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer block"
                  >
                    {tool.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{tool.category}</span>
                </div>
              </div>
            ))}
          </div>
          
          {infrastructureData.toolsUsed.includes('other') && (
            <div className="mt-4">
              <Label htmlFor="custom-tool" className="text-sm font-medium mb-2 block">
                Specify other tools
              </Label>
              <Input
                id="custom-tool"
                placeholder="Describe other tools used"
                value={infrastructureData.customTool}
                onChange={(e) => updateInfrastructureData({ customTool: e.target.value })}
                className="max-w-md"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">Database Type</Label>
          <p className="text-sm text-muted-foreground mb-4">Select the databases used</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {databaseTypes.map(db => (
              <div key={db.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`db-${db.id}`}
                  checked={infrastructureData.databaseType.includes(db.id)}
                  onCheckedChange={(checked) => handleDatabaseChange(db.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`db-${db.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer block"
                  >
                    {db.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{db.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">API Integrations</Label>
          <p className="text-sm text-muted-foreground mb-4">Select existing or planned integrations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiIntegrations.map(integration => (
              <div key={integration.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`integration-${integration.id}`}
                  checked={infrastructureData.apiIntegrations.includes(integration.id)}
                  onCheckedChange={(checked) => handleIntegrationChange(integration.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`integration-${integration.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer block"
                  >
                    {integration.label}
                  </Label>
                  <span className="text-xs text-muted-foreground">{integration.description}</span>
                </div>
              </div>
            ))}
          </div>
          
          {infrastructureData.apiIntegrations.includes('other') && (
            <div className="mt-4">
              <Label htmlFor="custom-integration" className="text-sm font-medium mb-2 block">
                Specify other integrations
              </Label>
              <Input
                id="custom-integration"
                placeholder="Describe other integrations or APIs used"
                value={infrastructureData.customIntegration}
                onChange={(e) => updateInfrastructureData({ customIntegration: e.target.value })}
                className="max-w-md"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Label className="text-lg font-semibold mb-4 block text-nowgo-gray">
            Digital Maturity Level *
          </Label>
          <p className="text-sm text-muted-foreground mb-6">
            Assess your company's current level of digitization
          </p>
          <RadioGroup
            value={infrastructureData.digitalMaturityLevel}
            onValueChange={(value) => updateInfrastructureData({ digitalMaturityLevel: value })}
            className="space-y-4"
          >
            {maturityLevels.map(level => (
              <div key={level.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:border-nowgo-blue/30 transition-colors">
                <RadioGroupItem value={level.id} id={`maturity-${level.id}`} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={`maturity-${level.id}`} className="font-semibold text-base cursor-pointer block">
                    {level.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                  <p className="text-xs text-nowgo-blue mt-2">{level.details}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(2)}
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

export default InfrastructureStep;
