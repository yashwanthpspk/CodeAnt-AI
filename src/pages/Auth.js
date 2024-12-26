import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Key, Code2 } from 'lucide-react';
import { useState } from 'react';
import images from '../constants/images';

export function AuthPage() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('saas');
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleLogin = async (provider) => {
    setIsLoading(true);
    try {
      await login(provider);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-white p-10 text-black lg:flex dark:border-r">
        <div className="absolute inset-0 bg-white" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="relative h-8 w-8 mr-2">
            <img 
              src={images.codeant}
              alt="CodeAnt AI Logo" 
              className="h-8 w-8 object-contain"
              onError={() => setLogoError(true)}
            />
          </div>
          <span>CodeAnt AI</span>
        </div>
        <div className="relative z-20 mt-auto flex items-center justify-center h-full">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4 max-w-md">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 mr-2">
                  <img 
                    src={images.codeant}
                    alt="CodeAnt Logo" 
                    className="h-8 w-8 object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
                <h3 className="text-lg font-semibold">AI to Detect & Autofix Bad Code</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">30+</div>
                  <div className="text-sm text-gray-600">Language Support</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-gray-600">Developers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100K+</div>
                  <div className="text-sm text-gray-600">Hours Saved</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-0 w-64 h-32 border border-gray-300 ml-auto -mt-6 relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-purple-200 rounded-full flex items-center justify-center mr-2">
                    <svg className="h-4 w-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
                    </svg>
                  </div>
                  <h3 className="text-md font-semibold">Issues Fixed</h3>
                </div>
                <div className="absolute top-2 right-2 text-blue-600 text-lg">
                  ↑ 14%
                  <div className="text-sm">This week</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-center">500K+</div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex items-center justify-center space-x-2">
              {!logoError ? (
                <img 
                  src={images.codeant}
                  alt="CodeAnt AI Logo" 
                  className="h-12 w-12 object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Code2 className="h-8 w-8" />
                </div>
              )}
              <span className="text-lg font-medium">CodeAnt AI</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-2">Welcome to CodeAnt AI</h1>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                variant={activeTab === 'saas' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('saas')}
                className="w-full"
              >
                SAAS
              </Button>
              <Button
                variant={activeTab === 'self-hosted' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('self-hosted')}
                className="w-full"
              >
                Self Hosted
              </Button>
            </div>
            {activeTab === 'saas' ? (
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => handleLogin('github')}
                  isLoading={isLoading}
                >
                  <img 
                    src={images.github}
                    alt="GitHub" 
                    className="mr-2 h-5 w-5 object-contain dark:invert" 
                  />
                  Sign in with Github
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => handleLogin('bitbucket')}
                  isLoading={isLoading}
                >
                  <img 
                    src={images.bitbucket}
                    alt="Bitbucket" 
                    className="mr-2 h-5 w-5 object-contain" 
                  />
                  Sign in with Bitbucket
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => handleLogin('azure')}
                  isLoading={isLoading}
                >
                  <img 
                    src={images.azure}
                    alt="Azure DevOps" 
                    className="mr-2 h-5 w-5 object-contain" 
                  />
                  Sign in with Azure DevOps
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => handleLogin('gitlab')}
                  isLoading={isLoading}
                >
                  <img 
                    src={images.gitlab}
                    alt="GitLab" 
                    className="mr-2 h-5 w-5 object-contain" 
                  />
                  Sign in with GitLab
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => handleLogin('gitlab-self')}
                  isLoading={isLoading}
                >
                  <img 
                    src={images.gitlab}
                    alt="GitLab" 
                    className="mr-2 h-5 w-5 object-contain" 
                  />
                  Self Hosted GitLab
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg" 
                  onClick={() => handleLogin('sso')}
                  isLoading={isLoading}
                >
                  <Key className="mr-2 h-5 w-5" />
                  Sign in with SSO
                </Button>
              </div>
            )}
            <p className="px-8 text-center text-sm text-gray-800">
              By signing up you agree to the{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 mb-4 ml-4 hidden lg:block">
        <img 
          src={images.codeant_logo}
          alt="CodeAnt Logo" 
          className="h-50 w-50 object-contain"
        />
      </div>
    </div>
  );
}

