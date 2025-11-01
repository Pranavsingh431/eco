import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="py-8">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Leaf className="text-primary h-10 w-10" />
          <h1 className="font-headline text-5xl font-bold text-gray-800 dark:text-gray-200">
            EcoAssess AI
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Smart Project Feasibility Advisor
        </p>
      </div>
    </header>
  );
}
