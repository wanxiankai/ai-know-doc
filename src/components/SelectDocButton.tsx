'use client'

import { Document } from "@prisma/client"

type Props = {
  doc: Document
}
function SelectDocButton({ doc }: Props) {
  return (
    <div>SelectDocButton</div>
  )
}

export default SelectDocButton