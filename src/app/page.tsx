import { getUser } from "@/auth/server"
import AskAIButton from "@/components/AskAIButton"
import DocTextInput from "@/components/DocTextInput"
import NewDocumentButton from "@/components/NewDocumentButton"
import { prisma } from "@/lib/prisma"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}

async function HomePage({ searchParams }: Props) {
  const docIdParams = (await searchParams).docId
  const user = await getUser()

  const docId = Array.isArray(docIdParams) ? docIdParams[0] : docIdParams || ""
  const doc = await prisma.document.findUnique({
    where: {
      id: docId,
      authorId: user?.id,
    },
  })

  return (
    <div className=' flex h-full flex-col items-center gap-4'>
      <div className='flex w-full max-w-4xl justify-end gap-2'>
        <AskAIButton user={user} doc={doc}/>
        <NewDocumentButton user={user} />
      </div>

      <DocTextInput docId={docId} startingDocText={doc?.text || ""} />
    </div>
  )
}

export default HomePage