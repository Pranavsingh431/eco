'use client';

import { formatDistanceToNow } from 'date-fns';
import { History, CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProjectHistoryItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

type ProjectHistoryProps = {
  history: ProjectHistoryItem[];
  onSelect: (item: ProjectHistoryItem) => void;
  selectedProjectId?: string;
};

const ratingConfig = {
  Sustainable: {
    color: 'text-primary',
    Icon: CheckCircle,
  },
  Moderate: {
    color: 'text-[hsl(var(--chart-4))]',
    Icon: AlertTriangle,
  },
  Unsustainable: {
    color: 'text-destructive',
    Icon: XCircle,
  },
};

export function ProjectHistory({ history, onSelect, selectedProjectId }: ProjectHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-3xl">
          <History className="h-6 w-6" />
          Project History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {history.map((item) => {
              const config = ratingConfig[item.result.rating];
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={cn(
                    'w-full text-left p-4 rounded-lg border transition-all hover:bg-muted/80 flex items-center justify-between',
                    selectedProjectId === item.id ? 'bg-muted ring-2 ring-primary' : 'bg-muted/40'
                  )}
                >
                  <div className="flex items-center gap-4">
                     <config.Icon className={cn("h-8 w-8 shrink-0", config.color)} />
                    <div className='overflow-hidden'>
                      <p className="font-bold truncate">{item.project.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.project.type} in {item.project.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
