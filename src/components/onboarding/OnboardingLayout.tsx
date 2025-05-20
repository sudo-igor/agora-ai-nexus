
import React from 'react';
import { OnboardingProvider } from './OnboardingContext';
import OnboardingSidebar from './OnboardingSidebar';
import OnboardingStepper from './OnboardingStepper';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const OnboardingLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <OnboardingProvider>
      <div className="min-h-screen flex w-full">
        {/* Desktop Sidebar */}
        {!isMobile && <OnboardingSidebar />}

        {/* Mobile Sidebar (Sheet) */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="fixed top-4 left-4 z-10">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <OnboardingSidebar />
            </SheetContent>
          </Sheet>
        )}

        {/* Main content area */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <OnboardingStepper />
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;
