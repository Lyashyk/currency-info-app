import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Label, Input, Button, FormGroup, FormFeedback } from 'reactstrap';

import { setCurrentDate } from '../../ducks/table';

import { writeToLocalStorige } from "../../utils";
import { getDifferenceOfDatesByDay } from './helpers';

const DateForm = ({ currentDate }) => {
    const dispatch = useDispatch();

    const [date, setDate] = useState(currentDate);

    const handleSubmit = e => {
        e.preventDefault();

        writeToLocalStorige('selected_date', date);

        dispatch(setCurrentDate(date))
    }

    const getErrorInput = () => !getDifferenceOfDatesByDay(new Date(date));

    const handleChange = useCallback(e => { setDate(e.target.value) }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="date">Дата</Label>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={handleChange}
                    invalid={getErrorInput()}
                />
                <FormFeedback>Выбрана дата по которой не возможно получить результат</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Button
                    disabled={getErrorInput()}
                >
                    Загрузить
            </Button>
            </FormGroup>
        </Form>
    );
}

export default DateForm;