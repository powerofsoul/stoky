import { Avatar } from 'tabler-react'

interface Props {
    imgHref?: string | null
    size: any
    username: string
    className?: string
}

const component = ({ imgHref, size, username, className }: Props) => {
    return imgHref ? (
        <Avatar className={className} size={size ?? 'sm'} imageURL={imgHref} />
    ) : (
        <Avatar className={className} size={size ?? 'sm'}>
            {username.substr(0, 2).toLocaleUpperCase()}
        </Avatar>
    )
}

export default component
