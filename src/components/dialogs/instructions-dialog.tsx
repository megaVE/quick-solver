import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { config } from "@/constants/config";

interface InstructionsDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

export function InstructionsDialog({
	isOpen,
	onOpenChange,
}: InstructionsDialogProps) {
	return (
		<Dialog defaultOpen={true} open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className="font-title text-center">
						Instruções
					</DialogTitle>
				</DialogHeader>
				<p>
					Um cronômetro começará a contar logo que o botão <b>Começar</b> for
					pressionado e será encerrado automaticamente quando todas as{" "}
					{config.QUESTIONS_AMOUNT} questões forem respondidas corretamente.
				</p>
				<p>
					As respostas serão validadas logo que selecionar o campo de outra
					questão ou quando pressionar <b>Tab</b> ou <b>Enter</b> no teclado.
				</p>
				<p>Seu objetivo é acertar todas as questões no menor tempo possível</p>
				<DialogFooter className="!justify-center">
					<DialogClose asChild>
						<Button>Começar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
