import { PortfolioEventEnum } from '@prisma/client'
import { useState } from 'react'
import { Button } from 'tabler-react'
import styles from './BuySellToggle.module.scss'

type Value = 'BUY' | 'SELL'

interface Props {
    defaultValue?: Value
    onChange?: (value: Value) => void
    onBlur?: (value: Value) => void
}

const BuySellToggle = ({ defaultValue, onBlur, onChange }: Props) => {
    const [value, setValue] = useState<Value>('BUY')

    return (
        <div className={styles.BuySellToggle}>
            <Button
                type="button"
                color={value === 'BUY' ? 'success' : 'outline-success'}
                onClick={() => {
                    setValue('BUY')
                    onChange?.('BUY')
                    onBlur?.('BUY')
                }}
            >
                BUY
            </Button>
            {/* <Button
                type="button"
                color={value === 'SELL' ? 'danger' : 'outline-danger'}
                onClick={() => {
                    setValue('SELL')
                    onChange?.('SELL')
                    onBlur?.('SELL')
                }}
            >
                SELL
            </Button> */}
            <span className="invalid-feedback">TEST</span>
        </div>
    )
}

export default BuySellToggle
