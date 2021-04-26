import { Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';

import { getIsLoading, getCurrentDate } from '../../ducks/table';

import DateForm from './date-form';
import Grid from './grid';

import './content-table.css';

const ContentTable = () => {
    const currentDate = useSelector(getCurrentDate);
    const isTableLoading = useSelector(getIsLoading);

    return (
        <div className="ContentTable">
            {
                isTableLoading &&
                <div className="ContentTable-loader">
                    <Spinner color="warning" size="64px" />
                </div>
            }

            <div className="ContentTable-form">
                <DateForm currentDate={currentDate} />
            </div>

            <div className="ContentTable-title">Курс валют по состоянию на {currentDate}</div>

            <div className="ContentTable-grid">
                <Grid currentDate={currentDate} />
            </div>
        </div>
    )
}

export default ContentTable;



