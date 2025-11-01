"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const difficulties = [
    {
      id: "facil",
      name: "Fácil",
      icon: "🌱",
      description: "10 perguntas básicas sobre sustentabilidade",
      color: "from-green-400 to-green-500",
    },
    {
      id: "medio",
      name: "Médio",
      icon: "🌿",
      description: "15 perguntas sobre práticas eco-friendly",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      id: "dificil",
      name: "Difícil",
      icon: "🌳",
      description: "20 perguntas avançadas sobre meio ambiente",
      color: "from-teal-500 to-teal-700",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-2">EcoAventura</h1>
          <p className="text-xl text-muted-foreground mb-1">Missão Sustentável</p>
          <p className="text-base text-muted-foreground">
            Teste seus conhecimentos sobre sustentabilidade e meio ambiente
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-8 text-center text-foreground">Escolha seu Nível de Dificuldade</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {difficulties.map((difficulty) => (
              <Card
                key={difficulty.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedDifficulty === difficulty.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedDifficulty(difficulty.id)}
              >
                <div className="text-4xl mb-3 text-center">{difficulty.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-center text-card-foreground">{difficulty.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{difficulty.description}</p>
                <div className="flex justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ${selectedDifficulty === difficulty.id ? "bg-primary" : "bg-border"}`}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            {selectedDifficulty ? (
              <Link href={`/game/${selectedDifficulty}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  Começar Jogo
                </Button>
              </Link>
            ) : (
              <Button size="lg" disabled className="px-8">
                Selecione uma Dificuldade
              </Button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-sm text-muted-foreground max-w-2xl">
          <p>Aprenda sobre sustentabilidade, plantas, rios e animais enquanto avança no jogo.</p>
          <p className="mt-2">Complete as missões e contribua para um planeta mais verde!</p>
        </div>
      </div>
    </main>
  )
}
