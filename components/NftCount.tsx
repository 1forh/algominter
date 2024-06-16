import { formatNumber } from '@/lib/helpers'
import { useProject } from '@/providers/ProjectProvider'
import React from 'react'

type Props = {
  count: number
}

const NftCount = ({ count }: Props) => {
  const { project } = useProject()
  return (
    <>
      <span className='font-medium'>{formatNumber(Math.round(count))}</span>
      <span className='text-white/50'>/{formatNumber(project.size)} NFTs</span>
    </>
  )
}

export default NftCount