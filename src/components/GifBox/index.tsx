import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

import { useEffect, useState } from 'react'
import { GIPHY_API_KEY } from '../../Consts'

const gf = new GiphyFetch(GIPHY_API_KEY)

interface Props {
    id: string | null
}

const GifBox = ({ id }: Props) => {
    const [gifData, setGifData] = useState<any>()

    const getGif = async () => {
        if (!id) return

        try {
            const { data } = await gf.gif(id)
            setGifData(data)
        } catch {
            // TODO add logging
        }
    }

    useEffect(() => {
        getGif()
    }, [id])

    if (!gifData) return <></>

    return <Gif gif={gifData} width={200} />
}

export default GifBox
