'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { deleteDocAction } from "@/actions/docs"


type Props = {
    docId: string,
    deleteDocLocally: (docId: string) => void
}

function DeleteDocButton({ docId, deleteDocLocally }: Props) {
    const router = useRouter();
    const docParams = useSearchParams().get('docId') || ""
    const [isPending, startTransition] = useTransition()

    const handleDeletceDoc = () => {
        startTransition(async () => {
            const { errorMessage } = await deleteDocAction(docId)
            if(!errorMessage) {
                toast.success('Document deleted', {
                    description: "The document has been deleted successfully.",
                })
                deleteDocLocally(docId)
                if (docId === docParams) {
                    router.replace("/")
                }
            }else {
                toast.error('Error deleting document', {
                    description: errorMessage,
                })
            }
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="absolute right-2 top-1/2 size-7 -translate-y-1/2 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
                    variant="ghost"
                >
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this doc?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your doc from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeletceDoc}
                        className="w-24 bg-destructive text-destructive-foreground hover:bg-destructive/90 "
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDocButton