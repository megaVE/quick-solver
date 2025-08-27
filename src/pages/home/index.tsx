import { TrophyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { OperationMap } from "@/constants/maps/operation";

export function HomePage() {
	const [focusMode, setFocusMode] = useState(true);

	return (
		<div>
			<header className="relative text-center space-y-4 m-4 mb-16">
				<h1 className="font-title text-5xl text-shadow-lg">Quick Solver</h1>
				<Button className="hidden md:inline-flex absolute top-0 left-0" asChild>
					<Link to="/results">
						<TrophyIcon className="size-4" />
						Placar
					</Link>
				</Button>
				<div className="text-left md:text-center text-lg md:max-w-7xl mx-auto space-y-6">
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
			<main className="m-4 text-center space-y-2">
				<h3 className="font-title text-xl">
					Selecione o tipo de questão que gostaria de resolver:
				</h3>
				<ul className="flex md:flex-row flex-col md:justify-center items-center gap-2">
					{Array.from(OperationMap).map(([value, label]) => (
						<li className="w-full md:w-auto" key={value}>
							<Button className="w-full md:w-auto" size="lg" asChild>
								<Link to={`questions/${value}?focus=${focusMode}`}>
									{label}
								</Link>
							</Button>
						</li>
					))}
				</ul>
				<div className="hidden md:flex justify-center items-center gap-2 mt-8">
					<Switch
						name="focus-mode"
						checked={focusMode}
						onCheckedChange={(checked) => setFocusMode(checked)}
					/>
					<Label htmlFor="focus-mode">Modo Foco</Label>
					<p className="text-xs ml-4 opacity-90">
						No modo foco, apenas uma questão é exibida por vez.
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}
