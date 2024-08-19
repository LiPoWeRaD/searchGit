import { FC, useState } from 'react';
import styles from './table.module.scss'
import { Card } from '@mui/material';
import Star from "../../svg/star";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Node } from "../../types/repositoryTypes";


// интерфейс отображения таблицы
interface TableProps {
    data: Node[];
    columns: GridColDef<Node>[];
}

const Table: FC<TableProps> = ({ data, columns }) => {  
    // информация о репозитории
    const [infoGit, setInfoGit] = useState<Node>();
    return (
        <>
          <h2 className={styles.title}>Результаты поиска</h2>
           <div className={styles.table}> 
            {/* карточки */}
              <Card className={styles.card}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  pageSizeOptions={[5, 10, 20, 50]}
                  getRowId={(row) => row.id}
                  onRowClick={(row) => setInfoGit(row.row)}
                  disableRowSelectionOnClick
                  disableColumnMenu
                  autoHeight
                  hideFooterSelectedRowCount
                  sx={{
                    borderTop: 0,
                    borderLeft: 0,
                    borderRight: 0,
                  }}
                ></DataGrid>
              </Card>
              {/* информация о репозитории */}
              <div className={styles.info}>
                  {infoGit ? <div>
                    <h3 className={styles.infoTitle}>{infoGit.name}</h3>
                    <div className={styles.infoText}>
                      {infoGit.primaryLanguage.name ? <p className={styles.infoTextName}>{infoGit.primaryLanguage.name}</p> : <p className={styles.infoTextName}>Неизвестен</p>}
                      {infoGit.stargazers.totalCount ? <p className={styles.infoTextStarCount}>{<Star />}<span>{infoGit.stargazers.totalCount}</span></p> : <p className={styles.infoTextStarCount}>{<Star />}0</p>}
                    </div>
                    <div className={styles.infoLanguage}>
                      {infoGit.languages?.nodes ? infoGit.languages.nodes.map((item: any) => {
                        return <p key={item.name} className={styles.infoTextLanguage}>{item.name}</p>
                      }) : <p className={styles.infoTextLanguage}>Отсутствуют</p>}
                    </div>
                    <p>{infoGit.licenseInfo.name}</p>
                  </div> : <div className={styles.infoEmpty}><p className={styles.infoTextEmpty}>Выберите репозитарий</p></div>}
              </div>
           </div>
        </>
    );
};

export { Table };