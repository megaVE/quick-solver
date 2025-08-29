import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useQuestionsContext } from "@/contexts/questions-context";

interface ReloadDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onReload: () => void;
}

export function ReloadDialog({
	isOpen,
	onOpenChange,
	onReload,
}: ReloadDialogProps) {
	const { questionsReset } = useQuestionsContext();

	function handleReload() {
		questionsReset();

		onReload();
	}

	return (
		<Dialog onOpenChange={onOpenChange} open={isOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-title text-center">
						Tem certeza de que deseja reiniciar o desafio?
					</DialogTitle>
				</DialogHeader>
				<p className="text-center text-sm">
					Todo o seu progresso do desafio atual será <b>perdido</b>.
				</p>
				<DialogFooter className="!justify-center">
					<DialogClose asChild>
						<Button variant="destructive">Cancelar</Button>
					</DialogClose>

					<Button onClick={handleReload}>Reiniciar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
