import { QuizGame } from "@/components/quiz-game"

export default function GamePage({ params }: { params: Promise<{ difficulty: string }> }) {
  return <QuizGame difficulty={params.difficulty as "facil" | "medio" | "dificil"} />
}
