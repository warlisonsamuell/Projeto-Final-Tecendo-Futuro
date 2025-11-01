"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: "planta" | "rio" | "animal"
}

interface QuizGameProps {
  difficulty: "facil" | "medio" | "dificil"
}

const QUESTIONS: Record<string, Question[]> = {
  facil: [
    {
      id: 1,
      question: "O que é sustentabilidade?",
      options: [
        "Usar apenas plástico biodegradável",
        "Atender as necessidades presentes sem comprometer o futuro",
        "Parar de usar energia elétrica",
        "Não usar produtos de origem animal",
      ],
      correctAnswer: 1,
      explanation:
        "Sustentabilidade é o equilíbrio entre satisfazer as necessidades atuais sem prejudicar as gerações futuras.",
      category: "planta",
    },
    {
      id: 2,
      question: "Qual é a principal fonte de energia renovável?",
      options: ["Carvão mineral", "Petróleo", "Energia solar", "Gás natural"],
      correctAnswer: 2,
      explanation: "A energia solar é inesgotável e não produz poluição, sendo uma das principais fontes renováveis.",
      category: "planta",
    },
    {
      id: 3,
      question: "Quanto tempo leva para um plástico se decompor na natureza?",
      options: ["5 anos", "50 anos", "500 anos", "Nunca se decompõe completamente"],
      correctAnswer: 2,
      explanation:
        "O plástico pode levar até 500 anos para se decompor, causando danos significativos ao meio ambiente.",
      category: "rio",
    },
    {
      id: 4,
      question: "O que é pegada de carbono?",
      options: [
        "Uma marca deixada no chão",
        "A quantidade total de gases de efeito estufa produzidos",
        "Um tipo de impressão digital",
        "Uma forma de energia alternativa",
      ],
      correctAnswer: 1,
      explanation:
        "Pegada de carbono é a medida do total de emissões de gases de efeito estufa causadas por nossas atividades.",
      category: "animal",
    },
    {
      id: 5,
      question: "Qual das seguintes ações ajuda a conservar a água?",
      options: [
        "Tomar banhos longos",
        "Deixar torneiras vazando",
        "Reutilizar água de chuva",
        "Lavar carro diariamente",
      ],
      correctAnswer: 2,
      explanation: "Reutilizar água de chuva é uma excelente forma de economizar água e reduzir o desperdício.",
      category: "rio",
    },
    {
      id: 6,
      question: "Qual é o benefício das árvores para o planeta?",
      options: [
        "Apenas fornecer madeira",
        "Produzir oxigênio e absorver CO2",
        "Servir como alimento",
        "Nenhum benefício especial",
      ],
      correctAnswer: 1,
      explanation:
        "As árvores são essenciais para absorver dióxido de carbono e liberar oxigênio, ajudando a combater o aquecimento global.",
      category: "planta",
    },
    {
      id: 7,
      question: "O que é reciclagem?",
      options: [
        "Jogar lixo no oceano",
        "Transformar resíduos em novos materiais",
        "Queimar lixo",
        "Deixar lixo no aterro",
      ],
      correctAnswer: 1,
      explanation:
        "Reciclagem é o processo de transformar materiais descartáveis em novos produtos, reduzindo resíduos.",
      category: "animal",
    },
    {
      id: 8,
      question: "Qual ecossistema produz mais oxigênio?",
      options: ["Deserto", "Tundra", "Floresta tropical", "Montanha"],
      correctAnswer: 2,
      explanation:
        'As florestas tropicais são conhecidas como "pulmões do planeta" por produzirem grandes quantidades de oxigênio.',
      category: "planta",
    },
    {
      id: 9,
      question: "O que é biodiversidade?",
      options: [
        "Diversidade de culturas",
        "Variedade de plantas e animais em um ecossistema",
        "Diversidade de idiomas",
        "Variedade de cores na natureza",
      ],
      correctAnswer: 1,
      explanation:
        "Biodiversidade refere-se à variedade de espécies de plantas, animais e micro-organismos em um ecossistema.",
      category: "animal",
    },
    {
      id: 10,
      question: "Qual atitude é mais sustentável?",
      options: [
        "Comprar mais produtos",
        "Usar plástico descartável",
        "Reduzir, reutilizar e reciclar",
        "Ignorar problemas ambientais",
      ],
      correctAnswer: 2,
      explanation: "Os três Rs - Reduzir, Reutilizar e Reciclar - são os pilares de um estilo de vida sustentável.",
      category: "rio",
    },
  ],
  medio: [
    // 15 perguntas de dificuldade média
    {
      id: 1,
      question: "O que é o ciclo de carbono?",
      options: [
        "Um tipo de bicicleta",
        "O processo de movimento do carbono entre a atmosfera, biosfera e litosfera",
        "Um evento climático",
        "Uma estrutura atômica",
      ],
      correctAnswer: 1,
      explanation:
        "O ciclo do carbono descreve como o carbono se move entre a atmosfera, oceanos, solo e organismos vivos.",
      category: "planta",
    },
    {
      id: 2,
      question: "Qual é o principal causador do efeito estufa?",
      options: ["Dióxido de nitrogênio", "Dióxido de carbono (CO2)", "Oxigênio", "Vapor de água apenas"],
      correctAnswer: 1,
      explanation: "O CO2 é o principal gás de efeito estufa, representando cerca de 75% das emissões globais.",
      category: "animal",
    },
    {
      id: 3,
      question: "O que é dessalinização?",
      options: [
        "Processo de congelar água",
        "Remoção de sal da água salgada para torná-la potável",
        "Adição de sal à água",
        "Evaporação da água do mar",
      ],
      correctAnswer: 1,
      explanation:
        "A dessalinização é um processo importante para converter água salgada em água doce em regiões áridas.",
      category: "rio",
    },
    {
      id: 4,
      question: "Qual é o impacto do aquecimento global nos corais?",
      options: [
        "Aumenta sua reprodução",
        "Causa o branqueamento e morte dos corais",
        "Melhora sua saúde",
        "Sem impacto significativo",
      ],
      correctAnswer: 1,
      explanation:
        "O aquecimento dos oceanos causa o branqueamento de coral, onde os corais expelem as algas simbióticas e morrem.",
      category: "animal",
    },
    {
      id: 5,
      question: "O que é permacultura?",
      options: [
        "Agricultura permanente auto-sustentável",
        "Tipo de cultivo em vasos",
        "Agricultura apenas em clima tropical",
        "Uso intensivo de pesticidas",
      ],
      correctAnswer: 0,
      explanation: "Permacultura é um sistema de design agrícola sustentável que trabalha com a natureza.",
      category: "planta",
    },
    {
      id: 6,
      question: "Qual é o maior reservatório de água doce do mundo?",
      options: ["Rios", "Lagos", "Geleiras e calotas polares", "Aquíferos subterrâneos"],
      correctAnswer: 2,
      explanation: "As geleiras e calotas polares contêm aproximadamente 68% da água doce do planeta.",
      category: "rio",
    },
    {
      id: 7,
      question: "O que é a pegada hídrica?",
      options: [
        "Impressão digital em água",
        "Volume total de água usada para produzir um produto",
        "Marcas deixadas na areia",
        "Tipo de erosão em rios",
      ],
      correctAnswer: 1,
      explanation: "Pegada hídrica é a quantidade de água usada na produção de um bem ou serviço.",
      category: "rio",
    },
    {
      id: 8,
      question: "Qual espécie está em maior risco de extinção?",
      options: ["Ratos", "Rinocerontes", "Pombas", "Insetos comuns"],
      correctAnswer: 1,
      explanation: "Rinocerontes enfrentam grave ameaça de extinção, especialmente devido à caça ilegal.",
      category: "animal",
    },
    {
      id: 9,
      question: "O que é economia circular?",
      options: [
        "Comprar mais produtos",
        "Sistema onde produtos são reutilizados em ciclos contínuos",
        "Economia em cidades redondas",
        "Tipo de moeda digital",
      ],
      correctAnswer: 1,
      explanation: "Economia circular visa manter recursos em uso pelo máximo tempo possível, minimizando resíduos.",
      category: "animal",
    },
    {
      id: 10,
      question: "Qual é o impacto da pecuária no meio ambiente?",
      options: [
        "Sem impacto significativo",
        "Responsável por 14% das emissões globais de gases de efeito estufa",
        "Melhora a qualidade do ar",
        "Reduz o desmatamento",
      ],
      correctAnswer: 1,
      explanation:
        "A pecuária é responsável por aproximadamente 14% das emissões de gases de efeito estufa globalmente.",
      category: "animal",
    },
    {
      id: 11,
      question: "O que são microplásticos?",
      options: [
        "Plásticos pequenos inofensivos",
        "Partículas de plástico menores que 5mm que se acumulam no meio ambiente",
        "Um tipo de embalagem",
        "Plástico reciclado",
      ],
      correctAnswer: 1,
      explanation:
        "Microplásticos são fragmentos de plástico que contaminam os oceanos, solo e até o ar que respiramos.",
      category: "rio",
    },
    {
      id: 12,
      question: "Qual é a importância das polinizadores?",
      options: [
        "Apenas para produção de mel",
        "Responsáveis por 75% da produção mundial de alimentos",
        "Sem grande importância",
        "Apenas para plantas ornamentais",
      ],
      correctAnswer: 1,
      explanation: "Os polinizadores, como abelhas, são vitais para a reprodução de plantas e produção de alimentos.",
      category: "animal",
    },
    {
      id: 13,
      question: "O que é reflorestamento?",
      options: [
        "Queimar florestas",
        "Plantio de árvores em áreas desmatadas",
        "Exploração de madeira",
        "Criação de parques urbanos apenas",
      ],
      correctAnswer: 1,
      explanation:
        "Reflorestamento é o plantio de árvores para restaurar florestas degradadas e combater mudanças climáticas.",
      category: "planta",
    },
    {
      id: 14,
      question: "Como os oceanos absorvem CO2?",
      options: [
        "Não absorvem CO2",
        "Através de processos químicos e biológicos que os tornam mais ácidos",
        "Apenas quando há tempestades",
        "De forma instantânea",
      ],
      correctAnswer: 1,
      explanation: "Os oceanos absorvem cerca de 30% do CO2 atmosférico, causando acidificação oceânica.",
      category: "rio",
    },
    {
      id: 15,
      question: "O que é energia renovável?",
      options: [
        "Energia que acaba em dias",
        "Energia de fontes inesgotáveis como sol e vento",
        "Apenas energia nuclear",
        "Energia cara e ineficiente",
      ],
      correctAnswer: 1,
      explanation:
        "Energias renováveis provêm de fontes naturais que se renovam continuamente, como sol, vento e água.",
      category: "planta",
    },
  ],
  dificil: [
    // 20 perguntas de dificuldade difícil
    {
      id: 1,
      question: "Qual é o nome do protocolo internacional sobre mudanças climáticas?",
      options: ["Protocolo de Montreal", "Protocolo de Kyoto", "Acordo de Paris", "Todas acima incluem"],
      correctAnswer: 2,
      explanation: "O Acordo de Paris (2015) é o protocolo atual que compromete países a limitar o aquecimento global.",
      category: "animal",
    },
    {
      id: 2,
      question: "O que é a Pegada Ecológica?",
      options: [
        "A medida de terras necessárias para sustentar o estilo de vida de uma pessoa",
        "Uma pegada deixada na lama",
        "Um tipo de impressão em papel",
        "Uma medida de peso",
      ],
      correctAnswer: 0,
      explanation: "Pegada Ecológica mede a área de terra e água necessárias para sustentar um estilo de vida.",
      category: "planta",
    },
    {
      id: 3,
      question: "Qual é o principal mecanismo de regulação térmica dos oceanos?",
      options: [
        "Reflexão de luz solar",
        "Correntes oceânicas e circulação termoclina",
        "Apenas a profundidade da água",
        "A presença de peixes",
      ],
      correctAnswer: 1,
      explanation: "Correntes oceânicas e a termoclina (camadas de temperatura) regulam o clima do planeta.",
      category: "rio",
    },
    {
      id: 4,
      question: "O que é metanogênese?",
      options: [
        "Processo de gerar energia solar",
        "Produção biológica de metano",
        "Tipo de vulcanismo",
        "Processo de fotoforese",
      ],
      correctAnswer: 1,
      explanation: "Metanogênese é a produção de metano por microorganismos em ambientes anaeróbicos.",
      category: "animal",
    },
    {
      id: 5,
      question: "Qual é a concentração de CO2 na atmosfera em 2024?",
      options: ["280 ppm", "350 ppm", "420+ ppm", "450+ ppm"],
      correctAnswer: 2,
      explanation: "Em 2024, o CO2 atmosférico ultrapassou 420 ppm, o nível mais alto em milhões de anos.",
      category: "planta",
    },
    {
      id: 6,
      question: "O que é a Zona Morta Oceânica?",
      options: [
        "Área onde nenhuma vida existe",
        "Áreas com baixo oxigênio causadas por eutrofização",
        "Zona de profundidade máxima",
        "Região próxima dos polos",
      ],
      correctAnswer: 1,
      explanation:
        "Zonas mortas são áreas com baixíssima concentração de oxigênio, causadas por poluição e eutrofização.",
      category: "rio",
    },
    {
      id: 7,
      question: "Qual é o impacto do El Niño na biodiversidade?",
      options: [
        "Apenas afeta aves",
        "Causa mudanças em padrões de chuva, temperatura e correntes oceânicas",
        "Sem impacto ambiental",
        "Melhora o clima de todas as regiões",
      ],
      correctAnswer: 1,
      explanation:
        "El Niño causa alterações significativas nos padrões climáticos globais, afetando toda a biodiversidade.",
      category: "animal",
    },
    {
      id: 8,
      question: "O que é Resiliência Climática?",
      options: [
        "Apenas resistência ao frio",
        "Capacidade de um sistema se recuperar de distúrbios climáticos",
        "Tipo de material à prova de calor",
        "Resistência ao envelhecimento",
      ],
      correctAnswer: 1,
      explanation:
        "Resiliência climática é a capacidade de um ecossistema ou sociedade se adaptar e recuperar de mudanças climáticas.",
      category: "planta",
    },
    {
      id: 9,
      question: "Qual é o principal componente do solo fértil?",
      options: ["Apenas areia", "Principalmente rocha", "Matéria orgânica, minerais e micro-organismos", "Apenas água"],
      correctAnswer: 2,
      explanation:
        "Solo fértil contém matéria orgânica, minerais essenciais e uma comunidade viva de micro-organismos.",
      category: "planta",
    },
    {
      id: 10,
      question: "O que é Acidificação Oceânica?",
      options: [
        "Adição de ácido ao oceano",
        "Redução do pH oceânico causada por absorção de CO2",
        "Apenas em regiões industrializadas",
        "Um processo natural positivo",
      ],
      correctAnswer: 1,
      explanation:
        "Acidificação oceânica ocorre quando o oceano absorve CO2, formando ácido carbônico e reduzindo o pH.",
      category: "rio",
    },
    {
      id: 11,
      question: "Qual é a taxa de desmatamento da Floresta Amazônica?",
      options: ["Nenhum desmatamento", "Menos de 1% ao ano", "Cerca de 1-2% ao ano", "Aumentando dramaticamente"],
      correctAnswer: 3,
      explanation: "A Amazônia enfrenta desmatamento crescente, ameaçando seu papel como regulador do clima global.",
      category: "planta",
    },
    {
      id: 12,
      question: "O que é um Sumidouro de Carbono?",
      options: [
        "Um tipo de pia",
        "Qualquer sistema que absorve mais carbono do que emite",
        "Uma montanha alta",
        "Apenas florestas",
      ],
      correctAnswer: 1,
      explanation: "Sumidouros de carbono removem CO2 da atmosfera e o armazenam, como florestas e oceanos.",
      category: "animal",
    },
    {
      id: 13,
      question: "Qual é o impacto da poluição luminosa nos animais?",
      options: [
        "Nenhum impacto significativo",
        "Desorienta migrações, afeta ciclos reprodutivos e perturba ecossistemas",
        "Melhora a visão dos animais",
        "Aumenta a produtividade",
      ],
      correctAnswer: 1,
      explanation: "Poluição luminosa desorienta animais noturnos, afeta ciclos reprodutivos e altera ecossistemas.",
      category: "animal",
    },
    {
      id: 14,
      question: "O que é a Titulação Ambiental?",
      options: [
        "Um título de propriedade",
        "Sistema de comércio de créditos de carbono e passivos ambientais",
        "Tipo de imposto",
        "Uma lei ambiental",
      ],
      correctAnswer: 1,
      explanation: "Titulação ambiental permite comercializar créditos de carbono e responsabilidades ambientais.",
      category: "rio",
    },
    {
      id: 15,
      question: "Qual é o ciclo de vida do plástico no oceano?",
      options: [
        "Se dissolve em dias",
        "Fragmenta em microplásticos que permanecem por séculos",
        "Desaparece sem deixar rastro",
        "Se biodegrada naturalmente",
      ],
      correctAnswer: 1,
      explanation:
        "O plástico oceânico fragmenta em microplásticos que persistem, contaminando toda a cadeia alimentar.",
      category: "rio",
    },
    {
      id: 16,
      question: "O que é Serviços Ecossistêmicos?",
      options: [
        "Apenas fornecimento de alimentos",
        "Benefícios que os humanos obtêm dos ecossistemas naturais",
        "Tipo de empresa de consultoria",
        "Apenas paisagem bonita",
      ],
      correctAnswer: 1,
      explanation:
        "Serviços ecossistêmicos incluem polinização, purificação de água, regulação climática e muitos outros.",
      category: "planta",
    },
    {
      id: 17,
      question: "Qual é o papel das micorrizas na floresta?",
      options: [
        "Nenhum papel importante",
        "Formam rede de comunicação e nutrição entre árvores",
        "Apenas decoração das raízes",
        "Causam doenças",
      ],
      correctAnswer: 1,
      explanation:
        "Micorrizas formam redes subterrâneas que conectam árvores, compartilhando nutrientes e informações.",
      category: "planta",
    },
    {
      id: 18,
      question: "O que é Compensação de Carbono?",
      options: [
        "Pagar multa por poluição",
        "Investir em projetos que reduzem emissões para compensar as suas",
        "Apenas promover energia solar",
        "Um tipo de impostos",
      ],
      correctAnswer: 1,
      explanation:
        "Compensação de carbono envolve investir em projetos de redução de emissões para equilibrar pegada de carbono.",
      category: "animal",
    },
    {
      id: 19,
      question: "Qual é o impacto da agricultura industrial na biodiversidade?",
      options: [
        "Aumenta a biodiversidade",
        "Reduz drasticamente habitats naturais e genética de cultivos",
        "Sem impacto significativo",
        "Melhora o ecossistema",
      ],
      correctAnswer: 1,
      explanation:
        "Agricultura industrial reduz biodiversidade, elimina habitats naturais e dependência de poucos cultivos.",
      category: "animal",
    },
    {
      id: 20,
      question: "O que é Justiça Climática?",
      options: [
        "Apenas um conceito teórico",
        "Reconhecimento de que impactos climáticos afetam desproporcionalmente comunidades vulneráveis",
        "Um sistema legal novo",
        "Apenas sobre compensação financeira",
      ],
      correctAnswer: 1,
      explanation:
        "Justiça climática aborda as desigualdades nos impactos e responsabilidades das mudanças climáticas.",
      category: "animal",
    },
  ],
}

export function QuizGame({ difficulty }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [progression, setProgression] = useState({ plants: 0, rivers: 0, animals: 0 })

  const questions = QUESTIONS[difficulty]
  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    setShowFeedback(true)

    if (optionIndex === currentQ.correctAnswer) {
      setScore(score + 1)
      setProgression((prev) => ({
        ...prev,
        [currentQ.category === "planta" ? "plants" : currentQ.category === "rio" ? "rivers" : "animals"]:
          prev[currentQ.category === "planta" ? "plants" : currentQ.category === "rio" ? "rivers" : "animals"] + 1,
      }))
    }
  }

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setGameOver(true)
    }
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Jogo Finalizado!</h2>
          <div className="mb-8">
            <p className="text-5xl font-bold text-primary mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-xl text-muted-foreground">Sua Pontuação Final</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-3xl mb-1">🌱</p>
              <p className="text-2xl font-bold text-primary">{progression.plants}</p>
              <p className="text-sm text-muted-foreground">Plantas</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-3xl mb-1">💧</p>
              <p className="text-2xl font-bold text-secondary">{progression.rivers}</p>
              <p className="text-sm text-muted-foreground">Rios</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-3xl mb-1">🐟</p>
              <p className="text-2xl font-bold text-accent">{progression.animals}</p>
              <p className="text-sm text-muted-foreground">Animais</p>
            </div>
          </div>

          <p className="text-lg mb-6 text-foreground">
            {score === questions.length
              ? "Perfeito! Você é um especialista em sustentabilidade!"
              : score >= questions.length * 0.8
                ? "Excelente! Você tem muito conhecimento sobre sustentabilidade."
                : score >= questions.length * 0.6
                  ? "Bom trabalho! Você sabe bastante sobre o tema."
                  : "Continue aprendendo! Cada resposta nos aproxima de um planeta mais verde."}
          </p>

          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">Voltar ao Menu</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header com Progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Pergunta {currentQuestion + 1} de {questions.length}
              </p>
              <h1 className="text-2xl font-bold text-primary">
                Pontuação: {score}/{questions.length}
              </h1>
            </div>
            <Link href="/">
              <Button variant="outline">Sair</Button>
            </Link>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Progressão Visual */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-center border border-border">
            <p className="text-2xl mb-1">🌱</p>
            <p className="text-xs font-semibold text-primary">{progression.plants}</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-center border border-border">
            <p className="text-2xl mb-1">💧</p>
            <p className="text-xs font-semibold text-secondary">{progression.rivers}</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-center border border-border">
            <p className="text-2xl mb-1">🐟</p>
            <p className="text-xs font-semibold text-accent">{progression.animals}</p>
          </div>
        </div>

        {/* Pergunta */}
        <Card className="p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-foreground text-balance">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? index === currentQ.correctAnswer
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-destructive bg-red-50 dark:bg-red-900/20"
                    : "border-border hover:border-primary/50"
                } ${showFeedback && index !== selectedAnswer && index !== currentQ.correctAnswer ? "opacity-50" : ""}`}
              >
                <p className="font-semibold text-foreground">{option}</p>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-lg ${selectedAnswer === currentQ.correctAnswer ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`}
            >
              <p
                className={`font-semibold mb-2 ${selectedAnswer === currentQ.correctAnswer ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
              >
                {selectedAnswer === currentQ.correctAnswer ? "Correto!" : "Incorreto"}
              </p>
              <p className="text-sm text-foreground">{currentQ.explanation}</p>
            </div>
          )}
        </Card>

        {/* Botão Próxima */}
        {showFeedback && (
          <div className="flex justify-center">
            <Button onClick={handleNext} size="lg" className="bg-primary hover:bg-primary/90">
              {currentQuestion + 1 === questions.length ? "Ver Resultados" : "Próxima Pergunta"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
