import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OperationMap } from "@/constants/maps/operation";

export function HomePage() {
	return (
		<div>
			<header className="text-center space-y-4 m-4 mb-16">
				<h1 className="font-title text-5xl text-shadow-lg">Quick Solver</h1>
				<div className="text-lg max-w-7xl mx-auto space-y-6">
					<p>
						<b>Quick Solver</b> é a maneira mais rápida e divertida de treinar
						suas habilidades matemáticas no dia a dia. Com desafios de{" "}
						<b>adição</b>, <b>subtração</b>, <b>multiplicação</b> e{" "}
						<b>divisão</b>, nossa aplicação ajuda você a praticar de forma
						simples, interativa e eficaz.
					</p>
					<p>
						Seja para reforçar o aprendizado, aumentar a agilidade mental ou
						apenas se divertir, o <b>Quick Solver</b> está pronto para tornar a
						matemática parte da sua rotina.
					</p>
				</div>
			</header>
			<main className="text-center space-y-2">
				<h3 className="font-title text-xl">
					Selecione o tipo de questão que gostaria de resolver:
				</h3>
				<ul className="flex justify-center items-center gap-2">
					{Array.from(OperationMap).map(([value, label]) => (
						<li key={value}>
							<Button
								asChild
								size="lg"
								className="font-bold text-slate-50 bg-slate-800"
							>
								<Link to={`questions/${value}`}>{label}</Link>
							</Button>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}
