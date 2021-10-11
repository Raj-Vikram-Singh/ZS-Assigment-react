import { useEffect, useState } from "react"

interface TableData {
    [key: string]: string | number;
}

interface columnMap {
    [key: string]: boolean;
}

export default function Table() {
    const url = './data.json'
    const [originalTableData, setOriginalTableData] = useState<TableData[]>([]);
    const [visibleTableData, setVisibleTableData] = useState<TableData[]>([]);
    const [showColumnMap, setShowColumnMap] = useState<columnMap>({});
    const [columnList, setColumnList] = useState<string[]>([]);
    const [defaultColumnList, setDefaultColumnList] = useState(['timestamp', 'attacker.id', 'attacker.ip', 'attacker.name', 'type', 'decoy.name']);
    const [currentPage, setCurrentPage] = useState<any>(0);
    const [totalPages, setTotalPages] = useState<any>(0);
    const PageSize = 20;

    const changePageIndex = (input: string) => {
        if (input === "next" && currentPage < totalPages) {
            setCurrentPage((prev: number) => prev + 1);
        } else if (input === "prev" && currentPage > 0) {
            setCurrentPage((prev: number) => prev - 1);
        } else if (input === "last") {
            setCurrentPage(totalPages);
        } else if (input === "first") {
            setCurrentPage(0);
        }
    }

    const sortColumn = (column: string) => {
        const visibleData = visibleTableData.sort(function (a, b) {
            if (a[column] < b[column]) { return -1; }
            else if (a[column] > b[column]) { return 1; }
            return 0;
        })
        setVisibleTableData([...visibleData]);
    }

    const changeColumnVisibility = (column: string) => {
        const newShowColumnMap = { ...showColumnMap }
        newShowColumnMap[column] = !newShowColumnMap[column];
        setShowColumnMap(newShowColumnMap);
    }

    useEffect(() => {
        const getData = async () => {
            const respJSON = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const response = await respJSON.json();
            setOriginalTableData(response);
            const tableLength = response.length;
            const lastPage = Math.ceil(tableLength / PageSize) - 1
            const showColumnMap: any = {}
            const columnList = Object.keys(response[0]);
            setColumnList(columnList);
            columnList.forEach(item => {
                if (defaultColumnList.includes(item)) {
                    showColumnMap[item] = true;
                } else {
                    showColumnMap[item] = false;
                }
            })
            setShowColumnMap(showColumnMap);
            setTotalPages(lastPage)
        }
        getData();
    }, [])

    useEffect(() => {
        const changePage = () => {
            let startIndex = currentPage * PageSize;
            let endIndex = currentPage * PageSize + PageSize;
            const visibleData = originalTableData.slice(startIndex, endIndex)
            setVisibleTableData([...visibleData]);
        }
        if (originalTableData) {
            changePage();
        }
    }, [originalTableData, currentPage])

    return (<div>
        <div><p>Visible Columns:
            {showColumnMap && columnList && columnList.map((column: string, index: any) => (
                <span key={index}><input type="checkbox" defaultChecked={showColumnMap[column]} onClick={() => changeColumnVisibility(column)} />{column} |</span>
            )
            )
            }</p>
        </div>
        <div className="table_wrapper">
            <table className="table">
                <thead>
                    <tr className="row">
                        {showColumnMap && columnList && columnList.map((column: string, index: any) => {
                            return showColumnMap[column] &&
                                <th className="column" key={index} onClick={() => sortColumn(column)}>{column}</th>
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    {originalTableData && visibleTableData && visibleTableData.map(data => (
                        <tr className="row" key={data.id}>
                            {showColumnMap && columnList && columnList.map((column, index: any) => {
                                return showColumnMap[column] &&
                                    <td className="column" key={index}>{data[column]}</td>
                            })
                            }
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
        <div className="pagination_wrapper"><span onClick={() => changePageIndex("first")}>First</span> <span onClick={() => changePageIndex("prev")}><i className="arrow left"></i> Prev</span>{currentPage} of {totalPages}<span onClick={() => changePageIndex("next")}>Next <i className="arrow right"></i></span> <span onClick={() => changePageIndex("last")}>Last</span> </div>
    </div>)
}
