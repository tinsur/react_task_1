import styles from './App.module.css';
import {useState} from "react";

function App() {
    let [value, setValue] = useState(0);
    let [list, setList] = useState([]);
    let [error, setError] = useState('');
    let isValueVaild = value ? true : false;

    const onInputButtonClick = () => {
        let promptValue = prompt('Введите новое')
        if (promptValue.length < 3) {
            setError('Введенное значение должно содержать минимум 3 символа');
        } else {
            setError('');
            setValue(promptValue);
        }
    }

    function onAddButtonClick() {
        if (value) {
            let time = new Intl.DateTimeFormat("ru", {dateStyle: "short", timeStyle: "medium"}).format(new Date());
            time= time.replace(',','');
            let updatedList = [...list, {id: list.length, value: value, time:time}]
            setList(updatedList)
            setValue(0);
            setError('');
        }

    }

    return (
        <div className={styles.app}>
            <h1 className={styles['page-heading']}>Ввод значения</h1>
            <p className={styles['no-margin-text']}>
                Текущее значение <code>value</code>:"
                <output className={styles['current-value']}>{value}</output>
                "
            </p>
            {error !== '' && <div className={styles.error}>{error}</div>}
            <div className={styles['buttons-container']}>
                <button className={styles.button} onClick={onInputButtonClick}>Ввести новое</button>
                <button className={styles.button} disabled={!isValueVaild} onClick={onAddButtonClick}>Добавить в
                    список
                </button>
            </div>
            <div className={styles['list-container']}>
                <h2 className={styles['list-heading']}>Список:</h2>
                {!list.length && <p className={styles['no-margin-text']}>Нет добавленных элементов</p>}
                <ul className={styles.list}>
                    {list.map(({id, value, time}) => <li className={styles['list-item']} key={id} >{value} - {time}</li>)}
                </ul>
            </div>
        </div>

    );
}

export default App;