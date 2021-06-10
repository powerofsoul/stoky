import AsyncSelect from 'react-select/async'
import { debounce } from 'lodash'
import { get } from '../../Api'
import { YahooStock } from '../../../models/YahooStock'

interface Props {
    onChange?: (symbol: string) => void
    value?: YahooStock
    error?: string
    form?: any
    name?: string
}

const TickerSearch = ({ onChange, value, error, form, name }: Props) => {
    const getQuery = async (query: string) => {
        const result = await get<YahooStock[]>('stock/query', { query })

        return result
    }

    const baseOnChange = (symbol: string | undefined) => {
        form?.setFieldValue(name, symbol)
        onChange?.(symbol || '')
    }

    return (
        <>
            <AsyncSelect
                cacheOptions
                loadOptions={debounce((inputValue, callback) => {
                    getQuery(inputValue).then((res) => callback(res))
                }, 500)}
                onChange={(s) => baseOnChange(s?.symbol)}
                getOptionLabel={(s) => s.symbol}
                getOptionValue={(s) => s.symbol}
                defaultValue={value}
                styles={{
                    container: () => ({
                        border: error ? '1px #cd201f solid' : '',
                    }),
                }}
                name={name}
            />

            {error && (
                <span className="invalid-feedback" style={{ display: 'unset' }}>
                    {error}
                </span>
            )}
        </>
    )
}

export default TickerSearch
