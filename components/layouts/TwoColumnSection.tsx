'use client'

import { ReactNode } from 'react'

type TwoColumnSectionProps = {
  leftContent: ReactNode
  rightImageSrc: string
  rightImageAlt: string
}

export const TwoColumnSection = ({ leftContent, rightImageSrc, rightImageAlt }: TwoColumnSectionProps) => {
  return (
    <section className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:justify-center md:gap-4 lg:gap-10 w-full h-full min-h-0 overflow-hidden ">
      {leftContent}

      <div className="flex-1 w-full rounded-3xl overflow-hidden  lg:max-w-3xl">
        <img
          src={rightImageSrc}
          alt={rightImageAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}
