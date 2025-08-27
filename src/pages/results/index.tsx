import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { config } from "@/constants/config";
import { type Operation, OperationMap } from "@/constants/maps/operation";
import { ScoreRateMap } from "@/constants/maps/score-rate";
import { formatMilliseconds } from "@/helpers/format-milliseconds";
import { formatTimer } from "@/helpers/format-timer";
import { formatTimestamp } from "@/helpers/format-timestamp";
import { useScoreboard } from "@/hooks/use-scoreboard";

export function ResultsPage() {
	const [searchParams] = useSearchParams();
	const [scoreboard, _, resetScoreboard] = useScoreboard();

	const category = searchParams.get("category") as Operation | null;

	const getMedal = useCallback((index: number) => {
		if (index === 0) return "🥇";
		if (index === 1) return "🥈";
		if (index === 2) return "🥉";
		return "🏅";
	}, []);

	function handleResetScoreboard() {
		const confirmReset = confirm(
			"Tem certeza de que deseja Reiniciar o Placar? Todo o progresso atual será perdido.",
		);

		if (!confirmReset) return;

		resetScoreboard();
	}

	return (
		<div>
			<header className="relative text-center space-y-4 m-4 mb-16">
				<h1 className="font-title text-5xl text-shadow-lg">Placar</h1>
				<Button className="md:inline-flex hidden absolute top-0 left-0" asChild>
					<Link to="/">
						<ArrowLeftIcon className="size-4" />
						Voltar
					</Link>
				</Button>
			</header>
			<main className="flex justify-center space-y-4 p-4">
				<Tabs defaultValue={category ?? ("addition" as Operation)}>
					<TabsList>
						{Array.from(OperationMap).map(([value, label]) => (
							<TabsTrigger key={value} value={value}>
								{label}
							</TabsTrigger>
						))}
					</TabsList>
					{Array.from(OperationMap).map(([operationValue, operationLabel]) => (
						<TabsContent key={operationValue} value={operationValue}>
							<Table className="md:w-md">
								<TableHeader>
									<TableRow>
										<TableHead>#</TableHead>
										<TableHead className="w-40 text-center">Jogador</TableHead>
										<TableHead>Tempo</TableHead>
										<TableHead>Pontuação</TableHead>
										<TableHead>Obtenção</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{scoreboard[operationValue].map((item, itemIndex) => (
										<TableRow key={`score-${itemIndex.toString()}`}>
											<TableCell>{getMedal(itemIndex)}</TableCell>
											<TableCell className="text-center">
												{item.playerName.length > 0
													? item.playerName
													: "Anônimo"}
											</TableCell>
											<TableCell>
												{formatTimer(formatMilliseconds(item.time))}
											</TableCell>
											<TableCell>{ScoreRateMap.get(item.rate)}</TableCell>
											<TableCell>{formatTimestamp(item.createdAt)}</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell colSpan={5} className="justify-end">
											<Button
												className="text-destructive/90 hover:text-destructive"
												variant="ghost"
												size="sm"
												onClick={handleResetScoreboard}
											>
												Reiniciar Placar
											</Button>
										</TableCell>
									</TableRow>
								</TableFooter>
								<TableCaption className="text-center">
									{config.LEADERBOARD_SIZE} melhores pontuações da categoria{" "}
									<b>{operationLabel}</b>
								</TableCaption>
							</Table>
						</TabsContent>
					))}
				</Tabs>
			</main>
			<Footer />
		</div>
	);
}
