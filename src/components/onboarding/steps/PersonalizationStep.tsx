
import React, { useState } from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Upload, Plus, X, Check } from 'lucide-react';

const PersonalizationStep: React.FC = () => {
  const { state, updatePersonalizationData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled, generateDashboard } = useOnboarding();
  const { personalizationData } = state;
  const { toast } = useToast();
  const [documentUrl, setDocumentUrl] = useState("");

  const llmRoles = [
    { value: 'consultant', label: 'Consultor' },
    { value: 'analyst', label: 'Analista' },
    { value: 'writer', label: 'Redator' },
    { value: 'legal-advisor', label: 'Assessor Jurídico' },
    { value: 'strategist', label: 'Estrategista' },
    { value: 'coach', label: 'Coach' }
  ];

  const focusAreas = [
    { id: 'growth', label: 'Crescimento' },
    { id: 'esg', label: 'ESG' },
    { id: 'finance', label: 'Finanças' },
    { id: 'digital-transformation', label: 'Transformação Digital' },
    { id: 'public-policy', label: 'Políticas Públicas' },
    { id: 'innovation', label: 'Inovação' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Vendas' },
    { id: 'hr', label: 'RH' },
    { id: 'operations', label: 'Operações' }
  ];

  const handleFocusAreaChange = (id: string, checked: boolean) => {
    let newFocusAreas = [...personalizationData.primaryFocus];
    
    if (checked) {
      newFocusAreas.push(id);
    } else {
      newFocusAreas = newFocusAreas.filter(item => item !== id);
    }
    
    updatePersonalizationData({ primaryFocus: newFocusAreas });
  };

  const handleAddDocumentUrl = () => {
    if (documentUrl) {
      updatePersonalizationData({
        documentUrls: [...personalizationData.documentUrls, documentUrl]
      });
      setDocumentUrl("");
    }
  };

  const handleRemoveDocumentUrl = (index: number) => {
    const newUrls = [...personalizationData.documentUrls];
    newUrls.splice(index, 1);
    updatePersonalizationData({ documentUrls: newUrls });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      updatePersonalizationData({
        documentUploads: [...personalizationData.documentUploads, ...newFiles]
      });

      // Show success toast
      toast({
        title: "Arquivos adicionados",
        description: `${newFiles.length} arquivo(s) adicionado(s) com sucesso`,
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...personalizationData.documentUploads];
    newFiles.splice(index, 1);
    updatePersonalizationData({ documentUploads: newFiles });
  };

  const handleFinish = () => {
    if (allRequiredFieldsFilled()) {
      markStepCompleted(5);
      generateDashboard();
      toast({
        title: "LLM sendo gerado",
        description: "Seu LLM personalizado está sendo criado com base nas informações fornecidas",
      });
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
        <h2 className="text-2xl font-semibold text-nowgo-gray">Personalização do LLM</h2>
        <p className="text-muted-foreground">Configure o comportamento e contexto para o seu LLM personalizado</p>
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Upload de Documentos de Contexto</Label>
        <div className="border-2 border-dashed border-border p-4 rounded-lg mb-4">
          <div className="text-center">
            <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Arraste seus arquivos ou clique para selecionar</p>
            <Input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <Label htmlFor="file-upload" className="inline-flex items-center justify-center bg-nowgo-blue text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-nowgo-darkBlue">
              Selecionar arquivos
            </Label>
          </div>
        </div>

        {personalizationData.documentUploads.length > 0 && (
          <div className="mb-4">
            <Label className="mb-2 block">Arquivos selecionados</Label>
            <div className="space-y-2">
              {personalizationData.documentUploads.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-full-row">
        <Label className="mb-2 block">Links para Repositórios ou Documentos</Label>
        <div className="flex items-center mb-2">
          <Input
            placeholder="URL do documento ou repositório"
            value={documentUrl}
            onChange={(e) => setDocumentUrl(e.target.value)}
            className="mr-2"
          />
          <Button
            type="button"
            onClick={handleAddDocumentUrl}
            className="flex-shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>

        {personalizationData.documentUrls.filter(url => url).length > 0 && (
          <div className="space-y-2 mb-4">
            {personalizationData.documentUrls.filter(url => url).map((url, index) => (
              <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                <span className="text-sm truncate">{url}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveDocumentUrl(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="space-y-2">
          <Label htmlFor="llm-role">Função do LLM *</Label>
          <Select
            value={personalizationData.llmRole}
            onValueChange={(value) => updatePersonalizationData({ llmRole: value })}
          >
            <SelectTrigger id="llm-role">
              <SelectValue placeholder="Selecione a função" />
            </SelectTrigger>
            <SelectContent>
              {llmRoles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="form-full-row mt-4">
        <Label className="mb-2 block">Foco Principal *</Label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {focusAreas.map(area => (
            <div key={area.id} className="flex items-start space-x-2">
              <Checkbox
                id={`focus-${area.id}`}
                checked={personalizationData.primaryFocus.includes(area.id)}
                onCheckedChange={(checked) => handleFocusAreaChange(area.id, checked === true)}
              />
              <Label
                htmlFor={`focus-${area.id}`}
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {area.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(4)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        <Button
          onClick={handleFinish}
          className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white"
        >
          Finalizar e Gerar LLM
        </Button>
      </div>
    </div>
  );
};

export default PersonalizationStep;
