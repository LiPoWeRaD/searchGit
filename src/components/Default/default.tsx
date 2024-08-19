import React from 'react' 
import styles from './default.module.scss'

const Default = () => {
    return (
        <div className={styles.block}> 
            <h2 className={styles.title}>Добро пожаловать</h2> 
        </div>
    )
}

export { Default }