'use client'
import { Document } from '@prisma/client'
import React, { use, useEffect, useMemo, useState } from 'react'
import { SidebarGroupContent as SidebarGroupContentShadCN, SidebarMenu, SidebarMenuItem } from './ui/sidebar'
import { Input } from './ui/input'
import { Delete, SearchIcon } from 'lucide-react'
import Fuse from 'fuse.js'
import SelectDocButton from './SelectDocButton'
import DeleteDocButton from './DeleteDocButton'

type Props = {
    docs: Document[]
}

function SidebarGroupContent({ docs }: Props) {
    console.log("docs", docs)
    const [searchText, setSearchText] = useState<string>("")
    const [localDocs, setLocalDocs] = useState<Document[]>(docs)

    useEffect(() => {
        setLocalDocs(docs)
    }, [docs])

    const fuse = useMemo(() => {
        return new Fuse(localDocs, {
            keys: ["text"],
            threshold: .4,
        })
    }, [localDocs])



    const filterDocs = searchText
        ? fuse.search(searchText).map((result) => result.item)
        :
        localDocs

    const deleteDocLocally = (docId: string) => {
        setLocalDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== docId))
    }

    return (
        <SidebarGroupContentShadCN>
            <div className='relative flex items-center'>
                <SearchIcon className="absolute left-2 size-4" />
                <Input
                    className='bg-muted pl-8'
                    placeholder='Search documents'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type='text'
                />
            </div>
            <SidebarMenu className='mt-4'>
                {filterDocs.map((doc) => (
                    <SidebarMenuItem key={doc.id} className='group/item'>
                        <SelectDocButton doc={doc} />
                        <DeleteDocButton docId={doc.id} 
                            deleteDocLocally={deleteDocLocally}
                        />
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroupContentShadCN>
    )
}

export default SidebarGroupContent