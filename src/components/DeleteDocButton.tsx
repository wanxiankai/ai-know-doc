'use client'

type Props = {
    docId: string,
    deleteDocLocally: (docId: string) => void
}

function DeleteDocButton({ docId, deleteDocLocally }: Props) {
    return (
        <div>DeleteDocButton</div>
    )
}

export default DeleteDocButton