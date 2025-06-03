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
import UsageAnalytics from './UsageAnalytics';

const Dashboard: React.FC = () => {
  const { state } = useOnboarding();
  const { companyData, objectivesData, personalizationData } = state;
  const { toast } = useToast();
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('chat');

  // Generate suggestions based on user input
  const suggestedQuestions = [
    `How can we optimize ${objectivesData.priorityAreas.includes('operations') ? 'operations' : 'business'} processes to reduce costs?`,
    `What ${objectivesData.priorityAreas.includes('growth') ? 'growth' : 'expansion'} strategies are recommended for companies in the ${companyData.industry} sector?`,
    `How to implement best ${objectivesData.priorityAreas.includes('esg') ? 'ESG' : 'sustainability'} practices in our organization?`,
    `What are the most relevant ${personalizationData.primaryFocus.includes('innovation') ? 'innovation' : 'technology'} trends for our sector?`,
    `How can we improve our ${objectivesData.priorityAreas.includes('marketing') ? 'marketing' : 'communication'} strategy to reach new customers?`
  ];

  const handleSuggestedQuestionClick = (question: string) => {
    setChatMessage(question);
    toast({
      title: "Question loaded",
      description: "The question was added to the chat. You can edit it before sending.",
    });
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) {
      toast({
        title: "Empty message",
        description: "Please type a message before sending.",
        variant: "destructive",
      });
      return;
    }

    // Add message to chat history
    setChatHistory(prev => [...prev, chatMessage.trim()]);

    // Simulate sending message
    toast({
      title: "Message sent",
      description: "Your message was sent to the NowGoAI assistant.",
    });
    
    // Clear the message after sending
    setChatMessage('');
  };

  const handleSectionNavigation = (area: string) => {
    const areaQuestion = `Tell me more about ${area} strategies and best practices for our ${companyData.industry} company.`;
    setChatMessage(areaQuestion);
    setActiveTab('chat');
    toast({
      title: "Section loaded",
      description: `Question about ${area} has been prepared in the chat.`,
    });
  };

  const generateInsightsReport = () => {
    const reportData = {
      company: {
        name: companyData.name,
        industry: companyData.industry,
        stage: companyData.stage,
        employees: companyData.employees,
        country: companyData.country
      },
      objectives: {
        priorityAreas: objectivesData.priorityAreas,
        challenges: objectivesData.challenges || 'Not specified'
      },
      personalization: {
        role: personalizationData.llmRole,
        primaryFocus: personalizationData.primaryFocus,
        documentsLoaded: personalizationData.documentUploads.length,
        referenceLinks: personalizationData.documentUrls.filter(url => url).length
      },
      user: {
        name: state.userProfileData.fullName,
        position: state.userProfileData.position,
        department: state.userProfileData.department,
        accessLevel: state.userProfileData.accessLevel
      },
      chatHistory: chatHistory,
      generationDate: new Date().toLocaleString('en-US')
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
      pdf.text('NowGoAI Insights Report', 20, 30);
      
      // Date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${reportData.generationDate}`, 20, 40);
      
      let yPosition = 60;
      
      // Company Information Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Company Information', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Name: ${reportData.company.name}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Industry: ${reportData.company.industry}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Stage: ${reportData.company.stage}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Employees: ${reportData.company.employees}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Country: ${reportData.company.country}`, 25, yPosition);
      yPosition += 20;
      
      // Objectives Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Objectives and Priorities', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Priority Areas: ${reportData.objectives.priorityAreas.join(', ')}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Main Challenges: ${reportData.objectives.challenges}`, 25, yPosition);
      yPosition += 20;
      
      // LLM Configuration Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('LLM Configuration', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Assistant Role: ${reportData.personalization.role}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Primary Focus: ${reportData.personalization.primaryFocus.join(', ')}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Context Documents: ${reportData.personalization.documentsLoaded} file(s)`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Reference Links: ${reportData.personalization.referenceLinks} link(s)`, 25, yPosition);
      yPosition += 20;
      
      // User Profile Section
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('User Profile', 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Name: ${reportData.user.name}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Position: ${reportData.user.position}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Department: ${reportData.user.department}`, 25, yPosition);
      yPosition += 8;
      pdf.text(`Access Level: ${reportData.user.accessLevel}`, 25, yPosition);
      yPosition += 20;
      
      // Chat History Section
      if (reportData.chatHistory.length > 0) {
        if (yPosition > 240) {
          pdf.addPage();
          yPosition = 30;
        }
        
        pdf.setFontSize(16);
        pdf.setTextColor(40, 40, 40);
        pdf.text('Chat Questions Sent', 20, yPosition);
        yPosition += 15;
        
        pdf.setFontSize(11);
        pdf.setTextColor(60, 60, 60);
        reportData.chatHistory.forEach((message, index) => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = 30;
          }
          
          const lines = pdf.splitTextToSize(`${index + 1}. ${message}`, 170);
          lines.forEach((line: string) => {
            pdf.text(line, 25, yPosition);
            yPosition += 6;
          });
          yPosition += 5;
        });
        yPosition += 10;
      }

      // Suggested Questions Section
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Suggested Questions to Explore', 20, yPosition);
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
        pdf.text('Report generated by NowGoAI Dashboard', 20, 285);
        pdf.text(`Page ${i} of ${pageCount}`, 170, 285);
      }
      
      // Save the PDF
      const fileName = `insights-${companyData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "Insights exported",
        description: "The PDF report was downloaded successfully!",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Export error",
        description: "An error occurred while generating the PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-nowgo-gray mb-2">
          Welcome to your Dashboard, {state.userProfileData.fullName.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground">
          Your customized LLM for {companyData.name} is ready to use
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Industry</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Company Stage</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Primary Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Target className="mr-2 h-5 w-5 text-nowgo-blue" />
              {personalizationData.primaryFocus.length > 0 
                ? personalizationData.primaryFocus[0].charAt(0).toUpperCase() + personalizationData.primaryFocus[0].slice(1) 
                : 'Not defined'}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="docs">Documents</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="mb-4 space-y-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-full bg-nowgo-blue/10 p-2">
                    <BrainCircuit className="h-6 w-6 text-nowgo-blue" />
                  </div>
                  <div className="flex-1 rounded-lg bg-muted p-4">
                    <p className="text-sm">
                      Hello, I am your personalized NowGoAI assistant for {companyData.name}. 
                      How can I help you today as a {personalizationData.llmRole === 'consultant' ? 'Consultant' : 
                        personalizationData.llmRole === 'analyst' ? 'Analyst' : 
                        personalizationData.llmRole === 'writer' ? 'Writer' : 
                        personalizationData.llmRole === 'legal-advisor' ? 'Legal Advisor' : 
                        personalizationData.llmRole === 'strategist' ? 'Strategist' : 'Coach'}?
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Textarea
                  placeholder="Type your question or request..."
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
                    Send message
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="docs" className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Context Documents</h3>
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
                  <p className="text-muted-foreground">No documents were uploaded.</p>
                )}
                
                <h3 className="text-lg font-medium pt-4">Reference Links</h3>
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
                  <p className="text-muted-foreground">No links were added.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="bg-white rounded-lg border p-6 shadow-sm">
              <UsageAnalytics 
                priorityAreas={objectivesData.priorityAreas} 
                chatHistory={chatHistory} 
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Questions</CardTitle>
              <CardDescription>
                Based on your profile and objectives
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
              <CardTitle className="text-lg">Section Navigation</CardTitle>
              <CardDescription>
                Access specific knowledge areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {objectivesData.priorityAreas.slice(0, 5).map((area, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="mr-2 px-3 py-1 cursor-pointer hover:bg-secondary"
                    onClick={() => handleSectionNavigation(area)}
                  >
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share Insights</CardTitle>
              <CardDescription>
                Share with your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={handleExportInsights}>
                <Download className="mr-2 h-4 w-4" />
                Export Insights
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
