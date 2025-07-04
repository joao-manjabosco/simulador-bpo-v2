import React from 'react';

export default function Home() {
  const handleStripeCheckout = () => {
    // Redireciona para o Stripe Checkout
    // Substitua pela sua URL real do Stripe Checkout
    window.location.href = "https://buy.stripe.com/bJe28qh0K6Rp0DLb9l9R600";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Simulador Profissional BPO
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            Acesso Vitalício por apenas R$ 497
          </h2>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              O que você vai receber:
            </h3>
            <ul className="text-left text-blue-700 space-y-2">
              <li>✅ Simulador completo de precificação BPO</li>
              <li>✅ Cálculo automático baseado em critérios profissionais</li>
              <li>✅ Score gamificado para classificação de clientes</li>
              <li>✅ Customização de equipe com impacto no preço</li>
              <li>✅ Acesso vitalício - pague uma vez, use para sempre</li>
              <li>✅ Atualizações futuras incluídas</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="text-3xl font-bold text-green-600 mb-2">
              R$ 497
            </div>
            <div className="text-gray-500 line-through text-lg">
              De R$ 997
            </div>
            <div className="text-sm text-red-600 font-medium">
              Oferta por tempo limitado!
            </div>
          </div>

          <button
            onClick={handleStripeCheckout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Comprar Agora - Acesso Vitalício
          </button>

          <div className="mt-6 text-sm text-gray-500">
            <p>🔒 Pagamento 100% seguro via Stripe</p>
            <p>💳 Cartão de crédito, débito ou PIX</p>
            <p>📧 Acesso enviado automaticamente por e-mail</p>
          </div>
        </div>
      </div>
    </div>
  );
}

