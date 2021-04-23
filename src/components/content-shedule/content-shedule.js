import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { Spinner } from 'reactstrap';

import { requestList, getListOfCurrency, getIsLoading } from '../../ducks/shedule';

import './content-shedule.css';

const ContentShedule = () => {
    const dispatch = useDispatch();

    const currencyList = useSelector(getListOfCurrency);
    const isLoading = useSelector(getIsLoading);

    useEffect(() => {
        if (!currencyList || currencyList.length < 1) {
            dispatch(requestList());
        }
    }, [dispatch, currencyList]);

    const CustomTooltip = ({ active, payload, label }) => {

        if (active) {
            return (
                <div className="ContentShedule-castomTooltip">
                    <div>
                        Курс: {JSON.stringify(payload[0].payload.rate, null, 2)}₴
                    </div>
                    <div>
                        Дата: {label}
                    </div>
                </div>
            )
        }

        return null;
    }

    return <div className="ContentShedule">
        {
            isLoading &&
            <div className="ContentShedule-loader"><Spinner color="warning" size="64px" /></div>
        }

        <h2 className="ContentShedule-title">График роста/падения евровалюты за 2020 год</h2>

        {
            !isLoading < 1 ?
                null
                :
                <div className="ContentShedule-plot">
                    <ResponsiveContainer width="100%" height={360}>
                        <AreaChart data={currencyList}>
                            <defs>
                                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ffd12c" stopOpacity={0.4} />
                                    <stop offset="75%" stopColor="#ffd12c" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>

                            <Area dataKey="rate" stroke="#ffd12c" fill="url(#color)" />

                            <XAxis dataKey="date" axisLine={false} tickLine={false} />

                            <YAxis
                                dataKey="rate"
                                axisLine={false}
                                tickLine={false}
                                tickCount={8}
                                tickFormatter={number => `₴${number}`}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <CartesianGrid opacity={0.5} vertical={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
        }
    </div>
}

export default ContentShedule;