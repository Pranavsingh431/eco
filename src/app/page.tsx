'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { evaluateProjectSustainability } from '@/ai/flows/evaluate-project-sustainability';
import { Header } from '@/components/header';
import { ProjectForm } from '@/components/project-form';
import { ProjectHistory } from '@/components/project-history';
import { SustainabilityReport } from '@/components/sustainability-report';
import type { Project, EvaluationResult, ProjectHistoryItem } from '@/lib/types';
import { Bot, Zap } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectHistoryItem | null>(null);
  const [projectHistory, setProjectHistory] = useState<ProjectHistoryItem[]>([]);
  const { toast } = useToast();

  const handleFormSubmit = async (projectData: Project) => {
    setIsLoading(true);
    setSelectedProject(null); // Clear selected project to show new one
    
    // Validate environment
    if (typeof window !== 'undefined' && !process.env.GEMINI_API_KEY) {
      toast({
        title: 'Configuration Error',
        description: 'API key is not configured. Please contact the administrator.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await evaluateProjectSustainability(projectData);
      
      if (!result) {
        throw new Error('No result received from AI analysis');
      }
      
      const newHistoryItem: ProjectHistoryItem = {
        id: new Date().toISOString() + Math.random(),
        project: projectData,
        result,
        timestamp: new Date(),
      };
      setProjectHistory((prev) => [newHistoryItem, ...prev]);
      setSelectedProject(newHistoryItem);
      
      toast({
        title: 'Analysis Complete',
        description: 'Your project has been successfully evaluated.',
      });
    } catch (error) {
      console.error('Error evaluating project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: 'Evaluation Failed',
        description: `There was an error while analyzing the project: ${errorMessage}. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectHistoryItem = (item: ProjectHistoryItem) => {
    setSelectedProject(item);
  };
  
  const currentReport = selectedProject?.result;

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Column: Form and History */}
          <div className="lg:col-span-2 space-y-8">
            <ProjectForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            <ProjectHistory 
              history={projectHistory} 
              onSelect={handleSelectHistoryItem}
              selectedProjectId={selectedProject?.id}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              {isLoading && (
                 <div
                  className="flex flex-col items-center justify-center text-center p-8 rounded-lg border-2 border-dashed h-96 animate-in fade-in"
                >
                  <Bot className="h-16 w-16 text-primary animate-pulse" />
                  <h3 className="font-headline text-2xl mt-4">AI is analyzing your project...</h3>
                  <p className="text-muted-foreground mt-2">Please wait while we assess the sustainability factors.</p>
                </div>
              )}
              {!isLoading && currentReport && (
                <div key={selectedProject?.id}>
                  <SustainabilityReport report={currentReport} />
                </div>
              )}
              {!isLoading && !currentReport && (
                <div
                  className="flex flex-col items-center justify-center text-center p-8 rounded-lg border-2 border-dashed h-96 animate-in fade-in"
                >
                   <Zap className="h-16 w-16 text-muted-foreground/50" />
                  <h3 className="font-headline text-2xl mt-4">Awaiting Project Submission</h3>
                  <p className="text-muted-foreground mt-2">Fill out the form to get an instant sustainability analysis of your project.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
