import React from 'react';
import {MyTable} from "./components/MyTable";
import {Button, TableColumnType} from "antd";
import {CSSUtils} from "./utils/css";

function App() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: { name: string }) => (
                <span>
                    <a>Edit</a>
                    <a style={{marginLeft: 8}}>Delete</a>
                </span>
            ),
        }
    ] as TableColumnType[];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Joe Black',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Jim Green',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
    ];

    const [size, setSize] = React.useState('large');

    const colorPrimary = CSSUtils.getRootVariable("--primary-color", "#4b14b4");
    const tableActionMarginBottom = CSSUtils.getElementVariable(".MyTable .header-action", 'margin-bottom');


    return (
        <div>
            <p>colorPrimary:{colorPrimary}</p>
            <p>tableActionMarginBottom:{tableActionMarginBottom}</p>
            <MyTable
                size={size as 'large' | 'middle' | 'small'}
                action={() => {
                    return [
                        <div>Table</div>,
                        <Button
                            type="primary"
                            onClick={()=>{
                                setSize('large');
                            }}
                        >Large</Button>,
                        <Button
                            type="primary"
                            onClick={()=>{
                                setSize('middle');
                            }}
                        >Middle</Button>,
                        <Button
                            type="primary"
                            onClick={()=>{
                                setSize('small');
                            }}
                        >Small</Button>
                    ]
                }}
                footer={(
                    <div style={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                    }}>
                        <Button
                            type="primary"
                        >Footer Button</Button>
                    </div>
                )}
                tableProps={{
                    columns: columns,
                    dataSource: data
                }}
            />

            <div style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
            }}>
                <Button
                    type="primary"
                >Default Button</Button>
            </div>
        </div>
    );
}

export default App;
