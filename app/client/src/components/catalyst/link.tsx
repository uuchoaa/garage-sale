import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { Link as WouterLink } from 'wouter'

export const Link = forwardRef(function Link(
  { href, ...props }: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <WouterLink href={href} {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
