import { Skeleton } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <>
    <div style={{display:'flex', flexDirection: "column"}}>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={120} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        </div>
        <div style={{display:'flex', flexDirection: "column"}}>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={120} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        </div>
        <div style={{display:'flex', flexDirection: "column"}}>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={120} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        </div>
        <div style={{display:'flex', flexDirection: "column"}}>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={120} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        <Skeleton>
          <Skeleton variant="rectangular" width={210} height={20} />
        </Skeleton>
        </div>
    </>
  )
}

export default Loading