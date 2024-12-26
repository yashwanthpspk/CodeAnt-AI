import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileHeader } from '../components/layout/MobileHeader';
import { repositories } from '../lib/utils';
import { RefreshCw, Plus, Search } from 'lucide-react';

export function RepositoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLanguageColor = (language) => {
    const colors = {
      'React': '#61dafb',
      'Javascript': '#f7df1e',
      'Python': '#3572A5',
      'Swift': '#ffac45',
      'Java': '#b07219',
      'HTML/CSS': '#e34c26',
      'PHP': '#4F5D95'
    };
    return colors[language] || '#6e7681';
  };

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        className="lg:hidden"
      />
      <Sidebar 
        className="hidden lg:block"
        isOpen={false}
        onClose={() => {}}
      />
      <div className="flex flex-col h-screen">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="border-b">
          <div className="flex justify-between items-center p-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Repositories</h1>
              <p className="text-sm text-muted-foreground">33 total repositories</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh All
              </Button>
              <Button 
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Repository
              </Button>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search Repositories"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-3">
            {filteredRepositories.map((repo) => (
              <div
                key={repo.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{repo.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      repo.visibility === "Public" 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {repo.visibility}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                    <span>{repo.size} KB</span>
                    <span>Updated {repo.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

