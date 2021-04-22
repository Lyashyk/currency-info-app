import { Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';

import { getIsTableLoading } from '../../ducks/table';
import { getTable, getTableCurrentDate, getDataByCurrentDate } from '../../ducks/table';
import DateForm from './date-form';
import Grid from './gtid';

import './content-table.css';

const ContentTable = () => {

    const table = useSelector(getTable);
    const currentDate = useSelector(getTableCurrentDate);

    const isTableLoading = useSelector(getIsTableLoading);

    const currencyList = useSelector(getDataByCurrentDate(currentDate));


    return (
        <div className="ContentTable">
            {
                isTableLoading &&
                <div className="ContentTable-loader">
                    <Spinner color="warning" size="64px" />
                </div>
            }

            <div className="ContentTable-form">
                <DateForm table={table} currentDate={currentDate} />
            </div>

            <div className="ContentTable-title">Курс валют по состоянию на {currentDate}</div>

            <div className="ContentTable-grid">
                <Grid table={table} currentDate={currentDate} />
            </div>
        </div>
    )
}

export default ContentTable;



