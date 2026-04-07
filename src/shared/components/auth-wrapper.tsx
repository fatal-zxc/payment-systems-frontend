import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

interface AuthWrapperProps {
	title: string
	description: string
	bottomText?: string
	bottomTextLink?: string
	bottomLinkHref?: string
}

export const AuthWrapper: FC<PropsWithChildren<AuthWrapperProps>> = ({
	title,
	description,
	bottomLinkHref,
	bottomText,
	bottomTextLink,
	children,
}) => {
	return (
		<div className='flex min-h-screen'>
			<div className='relative hidden overflow-hidden bg-linear-to-br from-violet-500 to-fuchsia-500 lg:flex lg:w-1/2'>
				<div className='absolute inset-0 bg-linear-to-br from-violet-500/90 to-fuchsia-500/90' />

				<div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-12'>
					<Image src='/images/logo.svg' alt='Payment' width={100} height={100} />
				</div>
			</div>

			<div className='flex w-full items-center p-8 lg:w-1/2'>
				<div className='mx-auto w-full max-w-md'>
					<div className='text-center lg:text-left'>
						<h1 className='text-3xl font-bold'>{title}</h1>
						<p className='mt-2 text-muted-foreground'>{description}</p>
					</div>

					<div className='my-5 p-0'>{children}</div>

					{bottomText && bottomTextLink && bottomLinkHref && (
						<p className='text-center text-sm text-muted-foreground'>
							{bottomText}{' '}
							<Link className='font-medium text-primary' href={bottomLinkHref}>
								{bottomTextLink}
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
