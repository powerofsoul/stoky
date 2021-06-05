import { Badge } from 'tabler-react'
import { toPrecision } from '../../Utils'

interface Props {
    value: number
    prefix?: string
    suffix?: string
    precision?: number
}

const ValueBadge = ({ value, prefix: p, suffix: s, precision }: Props) => {
    const prefix = p ?? ''
    const suffix = s ?? ''

    let renderValue = `${prefix}${value}${suffix}`
    if (precision) {
        renderValue = `${prefix}${toPrecision(value, precision)}${suffix}`
    }

    let badge = (
        <Badge color="secondary" className="mr-1">
            {renderValue}
        </Badge>
    )
    if (value > 0) {
        badge = (
            <Badge color="success" className="mr-1">
                {renderValue}
            </Badge>
        )
    } else if (value < 0) {
        badge = (
            <Badge color="danger" className="mr-1">
                {renderValue}
            </Badge>
        )
    }

    return <span>{badge}</span>
}

export default ValueBadge
