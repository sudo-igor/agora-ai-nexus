
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboarding } from '../onboarding/OnboardingContext';
import { BrainCircuit, Building, FileQuestion, MessageSquare, Share, BarChart3, Target, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { state } = useOnboarding();
  const { companyData, objectivesData, personalizationData } = state;
  const { toast } = useToast();
  const [chatMessage, setChatMessage] = useState('');

  // Generate suggestions based on user input
  const suggestedQuestions = [
    `Como podemos otimizar os processos de ${objectivesData.priorityAreas.includes('operations') ? 'operações' : 'negócio'} para reduzir custos?`,
    `Quais estratégias de ${objectivesData.priorityAreas.includes('growth') ? 'crescimento' : 'expansão'} são recomendadas para empresas no setor de ${companyData.industry}?`,
    `Como implementar melhores práticas de ${objectivesData.priorityAreas.includes('esg') ? 'ESG' : 'sustentabilidade'} em nossa organização?`,
    `Quais são as tendências de ${personalizationData.primaryFocus.includes('innovation') ? 'inovação' : 'tecnologia'} mais relevantes para o nosso setor?`,
    `Como podemos melhorar nossa estratégia de ${objectivesData.priorityAreas.includes('marketing') ? 'marketing' : 'comunicação'} para alcançar novos clientes?`
  ];

  const handleSuggestedQuestionClick = (question: string) => {
    setChatMessage(question);
    toast({
      title: "Pergunta carregada",
      description: "A pergunta foi adicionada ao chat. Você pode editá-la antes de enviar.",
    });
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) {
      toast({
        title: "Mensagem vazia",
        description: "Por favor, digite uma mensagem antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending message
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada para o assistente NowGoAI.",
    });
    
    // Clear the message after sending
    setChatMessage('');
  };

  const generateInsightsReport = () => {
    const reportData = {
      empresa: {
        nome: companyData.name,
        setor: companyData.industry,
        estagio: companyData.stage,
        funcionarios: companyData.employees,
        pais: companyData.country
      },
      objetivos: {
        areasPrioritarias: objectivesData.priorityAreas,
        desafios: objectivesData.challenges || 'Não especificado'
      },
      personalizacao: {
        papel: personalizationData.llmRole,
        focosPrimarios: personalizationData.primaryFocus,
        documentosCarregados: personalizationData.documentUploads.length,
        linksReferencia: personalizationData.documentUrls.filter(url => url).length
      },
      usuario: {
        nome: state.userProfileData.fullName,
        cargo: state.userProfileData.position,
        departamento: state.userProfileData.department,
        nivelAcesso: state.userProfileData.accessLevel
      },
      dataGeracao: new Date().toLocaleString('pt-BR')
    };

    const reportContent = `
# Relatório de Insights - NowGoAI
Gerado em: ${reportData.dataGeracao}

## Informações da Empresa
- **Nome:** ${reportData.empresa.nome}
- **Setor:** ${reportData.empresa.setor}
- **Estágio:** ${reportData.empresa.estagio}
- **Funcionários:** ${reportData.empresa.funcionarios}
- **País:** ${reportData.empresa.pais}

## Objetivos e Prioridades
- **Áreas Prioritárias:** ${reportData.objetivos.areasPrioritarias.join(', ')}
- **Principais Desafios:** ${reportData.objetivos.desafios}

## Configuração do LLM
- **Papel do Assistente:** ${reportData.personalizacao.papel}
- **Focos Primários:** ${reportData.personalizacao.focosPrimarios.join(', ')}
- **Documentos Contextuais:** ${reportData.personalizacao.documentosCarregados} arquivo(s)
- **Links de Referência:** ${reportData.personalizacao.linksReferencia} link(s)

## Perfil do Usuário
- **Nome:** ${reportData.usuario.nome}
- **Cargo:** ${reportData.usuario.cargo}
- **Departamento:** ${reportData.usuario.departamento}
- **Nível de Acesso:** ${reportData.usuario.nivelAcesso}

## Perguntas Sugeridas para Explorar
${suggestedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

---
Relatório gerado pelo NowGoAI Dashboard
    `.trim();

    return reportContent;
  };

  const handleExportInsights = () => {
    try {
      const reportContent = generateInsightsReport();
      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `insights-${companyData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Insights exportados",
        description: "O relatório foi baixado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao exportar",
        description: "Ocorreu um erro ao gerar o relatório. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-nowgo-gray mb-2">
          Bem-vindo ao seu Dashboard, {state.userProfileData.fullName.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground">
          Seu LLM customizado para {companyData.name} está pronto para uso
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Setor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Building className="mr-2 h-5 w-5 text-nowgo-blue" />
              {companyData.industry}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estágio da Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-nowgo-blue" />
              {companyData.stage}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Foco Principal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Target className="mr-2 h-5 w-5 text-nowgo-blue" />
              {personalizationData.primaryFocus.length > 0 
                ? personalizationData.primaryFocus[0].charAt(0).toUpperCase() + personalizationData.primaryFocus[0].slice(1) 
                : 'Não definido'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="docs">Documentos</TabsTrigger>
              <TabsTrigger value="analytics">Análise</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="mb-4 space-y-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-full bg-nowgo-blue/10 p-2">
                    <BrainCircuit className="h-6 w-6 text-nowgo-blue" />
                  </div>
                  <div className="flex-1 rounded-lg bg-muted p-4">
                    <p className="text-sm">
                      Olá, eu sou seu assistente NowGoAI personalizado para {companyData.name}. 
                      Como posso ajudar você hoje como {personalizationData.llmRole === 'consultant' ? 'Consultor' : 
                        personalizationData.llmRole === 'analyst' ? 'Analista' : 
                        personalizationData.llmRole === 'writer' ? 'Redator' : 
                        personalizationData.llmRole === 'legal-advisor' ? 'Assessor Jurídico' : 
                        personalizationData.llmRole === 'strategist' ? 'Estrategista' : 'Coach'}?
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Textarea
                  placeholder="Digite sua pergunta ou solicitação..."
                  className="min-h-[100px]"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    className="bg-nowgo-blue hover:bg-nowgo-darkBlue text-white"
                    onClick={handleSendMessage}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enviar mensagem
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="docs" className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documentos Contextuais</h3>
                {personalizationData.documentUploads.length > 0 ? (
                  <div className="space-y-2">
                    {personalizationData.documentUploads.map((file, index) => (
                      <div key={index} className="flex items-center p-2 border rounded-md">
                        <div className="flex-1">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhum documento foi carregado.</p>
                )}
                
                <h3 className="text-lg font-medium pt-4">Links de Referência</h3>
                {personalizationData.documentUrls.filter(url => url).length > 0 ? (
                  <div className="space-y-2">
                    {personalizationData.documentUrls.filter(url => url).map((url, index) => (
                      <div key={index} className="flex items-center p-2 border rounded-md">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-nowgo-blue hover:underline flex-1 truncate">
                          {url}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Nenhum link foi adicionado.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Análise de Uso</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Consultas por Área</CardTitle>
                      <CardDescription>Distribuição de consultas por área temática</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center bg-muted">
                      <p className="text-muted-foreground">Gráfico de distribuição</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Uso por Período</CardTitle>
                      <CardDescription>Volume de consultas ao longo do tempo</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center bg-muted">
                      <p className="text-muted-foreground">Gráfico de tendência</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Perguntas Sugeridas</CardTitle>
              <CardDescription>
                Baseadas no seu perfil e objetivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="p-2 border rounded-md hover:bg-secondary cursor-pointer transition-colors"
                    onClick={() => handleSuggestedQuestionClick(question)}
                  >
                    <div className="flex items-start">
                      <FileQuestion className="h-4 w-4 mr-2 mt-1 text-nowgo-blue" />
                      <p className="text-sm">{question}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navegação por Seção</CardTitle>
              <CardDescription>
                Acesse áreas específicas de conhecimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {objectivesData.priorityAreas.slice(0, 5).map((area, index) => (
                  <Badge key={index} variant="outline" className="mr-2 px-3 py-1 cursor-pointer hover:bg-secondary">
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compartilhar Insights</CardTitle>
              <CardDescription>
                Compartilhe com sua equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={handleExportInsights}>
                <Download className="mr-2 h-4 w-4" />
                Exportar Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
