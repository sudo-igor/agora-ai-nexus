
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnboarding } from '../onboarding/OnboardingContext';
import { BrainCircuit, Building, FileQuestion, MessageSquare, Share, BarChart3, Target, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

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

    return reportData;
  };

  const handleExportInsights = () => {
    try {
      const reportData = generateInsightsReport();
      
      // Create new PDF document
      const pdf = new jsPDF();
      
      // Set font
      pdf.setFont('helvetica');
      
      // Title
      pdf.setFontSize(20);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Relatório de Insights - NowGoAI', 20, 30);
      
      // Date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Gerado em: ${reportData.dataGeracao}`, 20, 40);
      
      let yPosition = 60;
      
      // Company Information Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Informações da Empresa', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Nome: ${reportData.empresa.nome}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Setor: ${reportData.empresa.setor}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Estágio: ${reportData.empresa.estagio}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Funcionários: ${reportData.empresa.funcionarios}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`País: ${reportData.empresa.pais}`, 25, yPosition);
      yPosition += 20;
      
      // Objectives Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Objetivos e Prioridades', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Áreas Prioritárias: ${reportData.objetivos.areasPrioritarias.join(', ')}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Principais Desafios: ${reportData.objetivos.desafios}`, 25, yPosition);
      yPosition += 20;
      
      // LLM Configuration Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Configuração do LLM', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Papel do Assistente: ${reportData.personalizacao.papel}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Focos Primários: ${reportData.personalizacao.focosPrimarios.join(', ')}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Documentos Contextuais: ${reportData.personalizacao.documentosCarregados} arquivo(s)`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Links de Referência: ${reportData.personalizacao.linksReferencia} link(s)`, 25, yPosition);
      yPosition += 20;
      
      // User Profile Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Perfil do Usuário', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Nome: ${reportData.usuario.nome}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Cargo: ${reportData.usuario.cargo}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Departamento: ${reportData.usuario.departamento}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Nível de Acesso: ${reportData.usuario.nivelAcesso}`, 25, yPosition);
      yPosition += 20;
      
      // Suggested Questions Section
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Perguntas Sugeridas para Explorar', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      suggestedQuestions.forEach((question, index) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 30;
        }
        
        const lines = pdf.splitTextToSize(`${index + 1}. ${question}`, 170);
        lines.forEach((line: string) => {
          pdf.text(line, 25, yPosition);
          yPosition += 6;
        });
        yPosition += 5;
      });
      
      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text('Relatório gerado pelo NowGoAI Dashboard', 20, 285);
        pdf.text(`Página ${i} de ${pageCount}`, 170, 285);
      }
      
      // Save the PDF
      const fileName = `insights-${companyData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "Insights exportados",
        description: "O relatório PDF foi baixado com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro ao exportar",
        description: "Ocorreu um erro ao gerar o relatório PDF. Tente novamente.",
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
