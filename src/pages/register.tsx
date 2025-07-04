import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate('/simulador');
    } catch (err: any) {
      console.error('Erro no registro:', err);
      
      // Tratar diferentes tipos de erro do Firebase
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este e-mail já está em uso');
          break;
        case 'auth/invalid-email':
          setError('E-mail inválido');
          break;
        case 'auth/weak-password':
          setError('Senha muito fraca');
          break;
        default:
          setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-3">
            Criar Sua Conta
          </h1>
          <p className="text-gray-600 font-medium">
            Você já pagou! Agora crie sua conta para acessar o simulador.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-up">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              📧 E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="animate-slide-up">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              🔒 Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="animate-slide-up">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              🔐 Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium"
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-modern py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 animate-slide-up"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Criando conta...
              </div>
            ) : (
              '🚀 Criar Conta e Acessar Simulador'
            )}
          </button>
        </form>

        <div className="mt-8 text-center animate-fade-in">
          <p className="text-gray-600 font-medium">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
            >
              Fazer login
            </button>
          </p>
        </div>

        <div className="mt-6 text-center animate-fade-in">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  );
}

