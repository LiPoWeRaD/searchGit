import { useState } from "react";
import { Default } from "../Default";
import { Table }  from "../Table/Table";
import { GridColDef } from '@mui/x-data-grid';
import { store } from "../../store";
import { Edges, Node } from "../../types/repositoryTypes";
import sort from "../../scripts/sort";
import main from '../../Styles/main.module.scss';
import styles from './tableGitSearch.module.scss'

const TableGitSearch = () => {
  // получение репозиториев
  const [repositories, setRepositories] = useState<Edges[]>();
  // получение состояния загрузки
  const [loading, setLoading] = useState<boolean>(false);
  // получение ошибки
  const [error, setError] = useState<string | null>(null);

  // подписка на store 
  store.subscribe(() => {
      store.getState().fetchRepositoriesReducer.repositories && setRepositories(store.getState().fetchRepositoriesReducer.repositories?.data.search.edges);
      store.getState().fetchRepositoriesReducer.loading ? setLoading(true) : setLoading(false);
      store.getState().fetchRepositoriesReducer.error && setError(store.getState().fetchRepositoriesReducer.error);
    }
  )    
  
  // конфигурация таблицы
  const columns: GridColDef<Node>[] = [
    {
      field: 'name',
      headerName: 'Название',
      minWidth: 150,
    },
    {
      field: 'primaryLanguage',
      headerName: 'Язык',
      minWidth: 150,
      renderCell: (params) => {
        return params.value.name
      },
      sortComparator: (v1, v2) => {
        return sort(v1.name, v2.name)
      }     
    },
    {
      field: 'forkCount',
      headerName: 'Число форков',
      minWidth: 150,
      type: 'number',
    },
    {
      field: 'stargazers',
      headerName: 'Число звезд',
      minWidth: 150,
      type: 'number',
      renderCell: (params) => {
        return params.value.totalCount
      },
      sortComparator: (v1, v2) => {
        return sort(v1.totalCount, v2.totalCount)
      }
    },
    {
      field: 'updatedAt',
      headerName: 'Дата обновления',
      minWidth: 150,
    }
  ]

  // получение данных
  const data: Node[] = repositories?.map((item) => {
    return {
      id: item.node.id,
      name: item.node.name,
      primaryLanguage: { name: item.node.primaryLanguage?.name },
      forkCount: item.node.forkCount,
      stargazers:  {totalCount: item.node.stargazers?.totalCount},
      updatedAt: item.node.updatedAt && item.node.updatedAt.slice(0, 10),
      licenseInfo: { name: item.node.licenseInfo?.name },
      languages: item.node.languages,
    };
  }) ?? [];
      
    
  return (
      <div className={styles.table}>
      {loading ? 
        <div className={main.loading}>Loading...</div> : 
        error ? <div className={main.error}>{error}</div> : 
        (repositories?.length === undefined || repositories === undefined) ? 
        <Default /> : 
        repositories?.length === 0 || !repositories ? 
        <div className={main.error}>Ничего не найдено</div> :
        <Table data={data} columns={columns}></Table>
      }
    </div>
  )
}

export { TableGitSearch }