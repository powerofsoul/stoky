import ReactGiphySearchbox from 'react-giphy-searchbox'
import dynamic from 'next/dynamic'
import Tippy, { tippy } from '@tippyjs/react'
import { useState } from 'react'
import { GIPHY_API_KEY } from '../../Consts'

interface Props {
    onChange: (link: string) => void
}

export const GifSearchButton = (props: Props) => {
    const search = (
        <ReactGiphySearchbox
            apiKey={GIPHY_API_KEY}
            onSelect={(item: any) => {
                props.onChange(item.id)
            }}
        />
    )

    return (
        <Tippy content={search} interactive hideOnClick="toggle" placement="bottom">
            <span>GIF</span>
        </Tippy>
    )
}

export default GifSearchButton

export const GifSearchButtonWithNoSSR = dynamic(() => import('./index'), { ssr: false })
