import { Badge } from 'tabler-react'
import { toPrecision } from '../../Utils'

interface Props {
    value: number
    baseValue?: number
    prefix?: string
    suffix?: string
    precision?: number
}

const ValueBadge = ({ value, prefix: p, suffix: s, precision, baseValue: bV }: Props) => {
    const prefix = p ?? ''
    const suffix = s ?? ''
    const baseValue = bV ?? 0

    let renderValue = `${prefix}${value}${suffix}`
    if (precision) {
        renderValue = `${prefix}${toPrecision(value, precision)}${suffix}`
    }

    let badge = (
        <Badge color="secondary" className="mr-1">
            {renderValue}
        </Badge>
    )
    if (value > baseValue) {
        badge = (
            <Badge color="success" className="mr-1">
                {renderValue}
            </Badge>
        )
    } else if (value < baseValue) {
        badge = (
            <Badge color="danger" className="mr-1">
                {renderValue}
            </Badge>
        )
    }

    return <span>{badge}</span>
}

export default ValueBadge
