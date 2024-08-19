import React, { useState } from "react";
import { UseActions } from '../../hooks/useActions';
import main from '../../Styles/main.module.scss';
import styles from './header.module.scss';


const Header = () => {
    // поиск 
    const [search, setSearch] = useState('');
    // получение данных
    const { fetchGetRepositories } = UseActions();

  
    // поиск
    const handleSubmit = () => {
        fetchGetRepositories(search || '');
    }  

    return (
        <div className={main.container}>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
            <input
                className={styles.input}
                type="text"
                placeholder="Введите поисковый запрос"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.button} type="submit">Искать</button>
            </form>
        </div>
    )
}

export { Header }