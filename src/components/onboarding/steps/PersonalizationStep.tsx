
import React, { useState } from 'react';
import { useOnboarding } from '../OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Upload, Plus, X, Check, FileText, Link2, Bot, Target } from 'lucide-react';

const PersonalizationStep: React.FC = () => {
  const { state, updatePersonalizationData, setCurrentStep, markStepCompleted, allRequiredFieldsFilled, generateDashboard } = useOnboarding();
  const { personalizationData } = state;
  const { toast } = useToast();
  const [documentUrl, setDocumentUrl] = useState("");

  const llmRoles = [
    { 
      value: 'consultant', 
      label: 'Consultor', 
      description: 'Fornece conselhos estratégicos e recomendações',
      example: 'Análise de mercado, estratégias de crescimento'
    },
    { 
      value: 'analyst', 
      label: 'Analista', 
      description: 'Processa dados e gera insights detalhados',
      example: 'Relatórios, tendências, métricas de performance'
    },
    { 
      value: 'writer', 
      label: 'Redator', 
      description: 'Cria conteúdo e documentos profissionais',
      example: 'Propostas, relatórios, comunicações'
    },
    { 
      value: 'legal-advisor', 
      label: 'Assessor Jurídico', 
      description: 'Orienta em questões legais e compliance',
      example: 'Contratos, regulamentações, políticas'
    },
    { 
      value: 'strategist', 
      label: 'Estrategista', 
      description: 'Desenvolve planos e visão de longo prazo',
      example: 'Planejamento estratégico, roadmaps'
    },
    { 
      value: 'coach', 
      label: 'Coach', 
      description: 'Orienta desenvolvimento e melhores práticas',
      example: 'Treinamento, desenvolvimento de equipe'
    }
  ];

  const focusAreas = [
    { id: 'growth', label: 'Crescimento', icon: '📈' },
    { id: 'esg', label: 'ESG', icon: '🌱' },
    { id: 'finance', label: 'Finanças', icon: '💰' },
    { id: 'digital-transformation', label: 'Transformação Digital', icon: '💻' },
    { id: 'public-policy', label: 'Políticas Públicas', icon: '🏛️' },
    { id: 'innovation', label: 'Inovação', icon: '💡' },
    { id: 'marketing', label: 'Marketing', icon: '📢' },
    { id: 'sales', label: 'Vendas', icon: '🎯' },
    { id: 'hr', label: 'RH', icon: '👥' },
    { id: 'operations', label: 'Operações', icon: '⚙️' },
    { id: 'legal', label: 'Legal', icon: '⚖️' },
    { id: 'strategy', label: 'Estratégia', icon: '🎲' }
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
    if (documentUrl.trim()) {
      updatePersonalizationData({
        documentUrls: [...personalizationData.documentUrls.filter(url => url), documentUrl.trim()]
      });
      setDocumentUrl("");
      toast({
        title: "Link adicionado",
        description: "URL do documento foi adicionada com sucesso",
      });
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-nowgo-gray mb-2">Personalização do LLM</h2>
        <p className="text-muted-foreground text-lg">Configure o comportamento e contexto para o seu LLM personalizado</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Documentos de Contexto</Label>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Adicione documentos que ajudarão a IA a entender melhor seu negócio
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-nowgo-blue/50 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Upload de Arquivos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Arraste seus arquivos ou clique para selecionar<br />
              <span className="text-xs">Suporte: PDF, DOC, TXT, MD (máx. 10MB cada)</span>
            </p>
            <Input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.md"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <Label 
              htmlFor="file-upload" 
              className="inline-flex items-center justify-center bg-nowgo-blue text-white px-6 py-3 rounded-md text-sm font-medium cursor-pointer hover:bg-nowgo-darkBlue transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Selecionar arquivos
            </Label>
          </div>

          {personalizationData.documentUploads.length > 0 && (
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Arquivos selecionados</Label>
              <div className="space-y-2">
                {personalizationData.documentUploads.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-600" />
                      <div>
                        <span className="text-sm font-medium text-green-800">{file.name}</span>
                        <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-4 h-4 text-nowgo-blue" />
              <Label className="text-sm font-medium">Links para Repositórios ou Documentos</Label>
            </div>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="https://exemplo.com/documento ou repositório Git"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleAddDocumentUrl()}
              />
              <Button
                type="button"
                onClick={handleAddDocumentUrl}
                className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white"
                disabled={!documentUrl.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>

            {personalizationData.documentUrls.filter(url => url).length > 0 && (
              <div className="space-y-2">
                {personalizationData.documentUrls.filter(url => url).map((url, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <Link2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-blue-800 truncate">{url}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDocumentUrl(index)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Função do LLM *</Label>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Defina o papel principal que a IA desempenhará
          </p>
          
          <Select
            value={personalizationData.llmRole}
            onValueChange={(value) => updatePersonalizationData({ llmRole: value })}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione a função principal" />
            </SelectTrigger>
            <SelectContent>
              {llmRoles.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  <div className="py-2">
                    <div className="font-medium">{role.label}</div>
                    <div className="text-xs text-muted-foreground">{role.description}</div>
                    <div className="text-xs text-nowgo-blue mt-1">{role.example}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-nowgo-blue" />
            <Label className="text-lg font-semibold text-nowgo-gray">Foco Principal *</Label>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Selecione as áreas onde a IA deve concentrar sua expertise
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {focusAreas.map(area => (
              <div key={area.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:border-nowgo-blue/30 transition-colors">
                <Checkbox
                  id={`focus-${area.id}`}
                  checked={personalizationData.primaryFocus.includes(area.id)}
                  onCheckedChange={(checked) => handleFocusAreaChange(area.id, checked === true)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`focus-${area.id}`}
                    className="text-sm font-medium leading-relaxed cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-lg">{area.icon}</span>
                    {area.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(4)}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar
        </Button>
        
        <Button
          onClick={handleFinish}
          className="bg-gradient-to-r from-nowgo-blue to-nowgo-darkBlue hover:from-nowgo-darkBlue hover:to-nowgo-blue text-white flex items-center gap-2 px-8"
        >
          <Bot className="w-4 h-4" />
          Finalizar e Gerar LLM
        </Button>
      </div>
    </div>
  );
};

export default PersonalizationStep;
