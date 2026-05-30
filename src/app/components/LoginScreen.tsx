import { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff, Lock, LogIn, CircleAlert, UserRound, Sparkles } from 'lucide-react';
import { AppIcon } from './shared/AppIcon';
import { login, type UserSession } from '../auth';

interface LoginScreenProps {
  onLogin: (session: UserSession) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const triggerShake = () => {
    setIsShaking(false);
    requestAnimationFrame(() => setIsShaking(true));
    window.setTimeout(() => setIsShaking(false), 450);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const session = await login(username, password);
      onLogin(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesion');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#060012] text-white relative flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,2,20,0.98),rgba(3,0,8,1))]" />
      <div className="absolute inset-0 opacity-28 bg-[linear-gradient(120deg,transparent_0%,rgba(168,85,247,0.14)_20%,transparent_45%,rgba(236,72,153,0.12)_65%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-22 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className={`relative w-full max-w-md ${isShaking ? 'login-shake' : ''}`}>
        <div className="glass-panel rounded-[24px] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.65)] overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-white/5 bg-black/15">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
                <AppIcon
                  src="/icons/seros.svg"
                  alt="SerOS"
                  className="w-14 h-14"
                  customFallback={<span className="text-sm font-semibold text-purple-100">SER OS</span>}
                />
              </div>
            </div>
            <h1 className="text-center text-2xl font-black tracking-wide text-white">SER OS</h1>
            <p className="text-center text-xs text-purple-200/70 mt-2">
              Acceso protegido al simulador de escritorio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-100">
                <UserRound className="w-4 h-4 text-purple-300" />
                Usuario
              </span>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 focus-within:border-purple-400/60 transition-colors">
                <input
                  ref={usernameRef}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={isLoading}
                  autoComplete="username"
                  spellCheck={false}
                  placeholder="Adriana, Valentina o Jose"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-purple-300/30 text-white disabled:opacity-70"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-100">
                <Lock className="w-4 h-4 text-purple-300" />
                Contrasena
              </span>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 focus-within:border-purple-400/60 transition-colors">
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contrasena compartida"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-purple-300/30 text-white disabled:opacity-70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  disabled={isLoading}
                  className="shrink-0 p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/5 disabled:opacity-50"
                  aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900/50 disabled:text-purple-200/60 px-4 py-3 text-sm font-semibold text-white transition-colors shadow-[0_0_18px_rgba(168,85,247,0.24)]"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Validando...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Ingresar
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-purple-200/50 leading-relaxed">
              Usuarios permitidos: Adriana, Valentina y Jose. La contrasena es compartida.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
