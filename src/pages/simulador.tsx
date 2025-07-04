import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// Dados dos tipos de serviço
const tiposServico = [
  "BPO Financeiro - Tesouraria",
  "BPO Gestão Financeira", 
  "BPO Controladoria",
  "Consultoria Financeira"
];

// Ícones para cada campo (usando emojis para simplicidade)
const fieldIcons = {
  tipoServico: "🏢",
  funcionarios: "👥",
  contas: "🏦",
  erp: "💻",
  maturidade: "📊",
  equipe: "👨‍💼"
};

// Função para calcular o score
function calcularScore(
  tipoServico: string,
  numeroFuncionarios: number,
  contasBancarias: number,
  erpNuvem: string,
  maturidade: string,
  equipe: string = ""
): { score: number; classificacao: string } {
  let score = 100;

  switch (tipoServico) {
    case "BPO Financeiro - Tesouraria":
    case "BPO Gestão Financeira":
      if (numeroFuncionarios > 5) score -= 15;
      if (contasBancarias > 1) score -= 10;
      if (erpNuvem === "Não") score -= 20;
      if (maturidade === "Média") score -= 10;
      if (maturidade === "Baixa") score -= 25;
      break;
    case "BPO Controladoria":
    case "CFO as a Service":
      if (erpNuvem === "Não") score -= 15;
      if (maturidade === "Média") score -= 10;
      if (maturidade === "Baixa") score -= 25;
      break;
    case "Consultoria Financeira":
      if (erpNuvem === "Não") score -= 10;
      if (maturidade === "Baixa") score -= 15;
      break;
    default:
      break;
  }

  // Ajuste de score por equipe customizada
  if (equipe.trim()) {
    const equipeTexto = equipe.toLowerCase();
    let ajusteScore = 0;

    const palavrasEspecializadas = [
      'senior', 'sênior', 'especialista', 'gerente', 'coordenador', 
      'analista senior', 'consultor', 'supervisor', 'líder', 'pleno'
    ];
    
    const palavrasBasicas = [
      'junior', 'júnior', 'estagiário', 'trainee', 'assistente', 
      'auxiliar', 'operacional', 'básico'
    ];

    let contadorEspecializada = 0;
    let contadorBasica = 0;

    palavrasEspecializadas.forEach(palavra => {
      if (equipeTexto.includes(palavra)) contadorEspecializada++;
    });

    palavrasBasicas.forEach(palavra => {
      if (equipeTexto.includes(palavra)) contadorBasica++;
    });

    if (contadorEspecializada > contadorBasica) {
      ajusteScore = contadorEspecializada * 5;
    } else if (contadorBasica > contadorEspecializada) {
      ajusteScore = - (contadorBasica * 5);
    }

    score += ajusteScore;
  }

  score = Math.max(0, Math.min(100, score));

  let classificacao = "Cliente Ideal";
  if (score < 40) classificacao = "Cliente Difícil";
  else if (score < 70) classificacao = "Cliente Médio";

  return { score, classificacao };
}

// Função para calcular o preço
function calcularPreco(score: number): number {
  let precoBase = 0;

  if (score >= 90) {
    precoBase = 2500;
  } else if (score >= 70) {
    precoBase = 2000;
  } else if (score >= 40) {
    precoBase = 1500;
  } else {
    precoBase = 1000;
  }

  precoBase *= (score / 100) * 0.5 + 0.75;

  return Math.round(precoBase);
}

// Componente do círculo de progresso
function PriceCard({ score, price, classificacao }: { score: number; price: number; classificacao: string }) {
  const circumference = 2 * Math.PI * 50;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 70) return "#10B981"; // Verde
    if (score >= 40) return "#F59E0B"; // Amarelo
    return "#EF4444"; // Vermelho
  };

  const getScoreGradient = () => {
    if (score >= 70) return "from-green-400 to-green-600";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="result-card animate-fade-in">
      <div className="relative mb-6">
        <svg className="w-32 h-32 mx-auto transform -rotate-90 score-circle" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke={getScoreColor()}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-800">{score}</span>
          <span className="text-sm font-medium text-gray-600">{classificacao}</span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700 mb-2">💰 Preço Estimado</p>
        <p className={`text-4xl font-bold bg-gradient-to-r ${getScoreGradient()} bg-clip-text text-transparent`}>
          R$ {price.toLocaleString('pt-BR')}
        </p>
        <p className="text-sm text-gray-500 mt-2">Valor mensal estimado</p>
      </div>
    </div>
  );
}

// Componente de campo moderno
function ModernField({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="field-container animate-slide-up">
      <div className="flex items-center mb-3">
        <div className="icon-container">
          {icon}
        </div>
        <label className="text-lg font-semibold text-gray-800">
          {label}
        </label>
      </div>
      {children}
    </div>
  );
}

export default function Simulador() {
  const [tipoServico, setTipoServico] = useState("BPO Controladoria");
  const [numeroFuncionarios, setNumeroFuncionarios] = useState(5);
  const [contasBancarias, setContasBancarias] = useState(1);
  const [erpNuvem, setErpNuvem] = useState("Não");
  const [maturidade, setMaturidade] = useState("Alta");
  const [equipe, setEquipe] = useState("");
  
  const { user, logout } = useAuth();

  const { score, classificacao } = calcularScore(tipoServico, numeroFuncionarios, contasBancarias, erpNuvem, maturidade, equipe);
  const price = calcularPreco(score);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 animate-fade-in">
        <div className="header-card rounded-2xl shadow-xl p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gradient">🚀 Simulador Profissional BPO</h1>
            <p className="text-gray-600 font-medium">Bem-vindo, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:transform hover:scale-105"
          >
            ↗️ Sair
          </button>
        </div>
      </div>

      {/* Simulador */}
      <div className="max-w-6xl mx-auto">
        <div className="main-container rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-4">
              ⚡ Simulador de Precificação
            </h2>
            <h3 className="text-2xl font-semibold text-white opacity-90">
              de Serviços BPO
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário - 2 colunas */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <ModernField icon={fieldIcons.tipoServico} label="Tipo de Serviço">
                  <select 
                    className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium" 
                    value={tipoServico} 
                    onChange={e => setTipoServico(e.target.value)}
                  >
                    {tiposServico.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </ModernField>

                <ModernField icon={fieldIcons.funcionarios} label="Número de Funcionários">
                  <select 
                    className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium" 
                    value={numeroFuncionarios} 
                    onChange={e => setNumeroFuncionarios(Number(e.target.value))}
                  >
                    <option value={5}>05</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100+</option>
                  </select>
                </ModernField>

                <ModernField icon={fieldIcons.contas} label="Contas Bancárias">
                  <select 
                    className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium" 
                    value={contasBancarias} 
                    onChange={e => setContasBancarias(Number(e.target.value))}
                  >
                    <option value={1}>1 Conta</option>
                    <option value={2}>2 Contas</option>
                    <option value={3}>3 Contas</option>
                    <option value={5}>5+ Contas</option>
                  </select>
                </ModernField>

                <ModernField icon={fieldIcons.erp} label="ERP em Nuvem">
                  <select 
                    className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium" 
                    value={erpNuvem} 
                    onChange={e => setErpNuvem(e.target.value)}
                  >
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </ModernField>

                <ModernField icon={fieldIcons.maturidade} label="Maturidade dos Processos">
                  <select 
                    className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium" 
                    value={maturidade} 
                    onChange={e => setMaturidade(e.target.value)}
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </ModernField>

                <ModernField icon={fieldIcons.equipe} label="Equipe Sugerida">
                  <textarea
                    className="w-full p-4 input-modern rounded-xl text-gray-800 font-medium resize-none"
                    rows={4}
                    value={equipe}
                    onChange={(e) => setEquipe(e.target.value)}
                    placeholder="Ex: 1 analista senior, 2 assistentes júnior..."
                  />
                  {equipe.trim() && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <p className="text-sm text-blue-700 font-medium">
                        💡 O preço está sendo ajustado com base na equipe informada
                      </p>
                    </div>
                  )}
                </ModernField>
              </div>
            </div>

            {/* Resultado - 1 coluna */}
            <div className="lg:col-span-1 flex items-center justify-center">
              <PriceCard score={score} price={price} classificacao={classificacao} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

