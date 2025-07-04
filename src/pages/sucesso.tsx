import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Aqui você pode adicionar lógica para:
    // 1. Verificar se o pagamento foi realmente processado
    // 2. Criar conta do usuário automaticamente
    // 3. Enviar e-mail de confirmação
    
    // Por enquanto, vamos redirecionar para o registro após 3 segundos
    const timer = setTimeout(() => {
      navigate('/register');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Seu pagamento foi processado com sucesso. Você será redirecionado para criar sua conta em alguns segundos.
          </p>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Próximos passos:</h3>
            <ol className="text-left text-green-700 text-sm space-y-1">
              <li>1. Crie sua conta de acesso</li>
              <li>2. Confirme seu e-mail</li>
              <li>3. Acesse o simulador profissional</li>
            </ol>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Criar Minha Conta Agora
          </button>
        </div>
      </div>
    </div>
  );
}

