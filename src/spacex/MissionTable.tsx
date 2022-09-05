import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { useQuery } from 'urql';

import { Mission } from "./types/MissionTable";
import { MissionsQuery } from "./api-client";

const TableControls = () => {

};

const MissionTable = () => {

    const [columnMission, setColumnMission] = useState({
        id: 'mission',
        name: 'Mission name',
        show: true,
    });

    const [columnDate, setColumnDate] = useState({
        id: 'date',
        name: 'Mission date',
        show: true,
    });

    const [columnRocket, setColumnRocket] = useState({
        id: 'rocket',
        name: 'Rocket name',
        show: true,
    });

    const [columnStatus, setColumnStatus] = useState({
        id: 'status',
        name: 'Mission status',
        show: true,
    });

    const [result, reexecuteQuery] = useQuery({
        query: MissionsQuery,
    });

    const {data, fetching, error} = result;

    if (fetching) {
        return <Spinner animation="border"/>
    }

    if (error) {
        return <p>Something went wrong... {error.message}</p>;
    }

    return (
        <div>
            <Form>
                <div key={`inline-checkbox`} className="mb-3">
                    <Form.Check
                        inline
                        label={columnMission.name}
                        name={columnMission.id}
                        type="checkbox"
                        id={columnMission.id}
                        checked={columnMission.show}
                        onClick={() => {
                            setColumnMission({
                                ...columnMission, show: !columnMission.show
                            });
                        }}
                    />
                    <Form.Check
                        inline
                        label={columnRocket.name}
                        name={columnRocket.id}
                        type="checkbox"
                        id={columnRocket.id}
                        checked={columnRocket.show}
                        onClick={() => {
                            setColumnRocket({
                                ...columnRocket, show: !columnRocket.show
                            });
                        }}
                    />
                    <Form.Check
                        inline
                        label={columnDate.name}
                        name={columnDate.id}
                        type="checkbox"
                        id={columnDate.id}
                        checked={columnDate.show}
                        onClick={() => {
                            setColumnDate({
                                ...columnDate, show: !columnDate.show
                            });
                        }}
                    />
                    <Form.Check
                        inline
                        label={columnStatus.name}
                        name={columnStatus.id}
                        type="checkbox"
                        id={columnStatus.id}
                        checked={columnStatus.show}
                        onClick={() => {
                            setColumnStatus({
                                ...columnStatus, show: !columnStatus.show
                            });
                        }}
                    />
                </div>
            </Form>

            <Table striped bordered>
                <thead>
                <tr>
                    {columnMission.show && <th>{columnMission.name}</th>}
                    {columnRocket.show && <th>{columnRocket.name}</th>}
                    {columnDate.show && <th>{columnDate.name}</th>}
                    {columnStatus.show && <th>{columnStatus.name}</th>}
                </tr>
                </thead>

                <tbody>
                {data.launchesPast.map((pastLaunch: Mission) => (
                    <tr>
                        {columnMission.show && <td>{pastLaunch.mission_name}</td>}
                        {columnRocket.show && <td>{pastLaunch.rocket.rocket_name}</td>}
                        {columnDate.show && <td>{pastLaunch.launch_date_local}</td>}
                        {columnStatus.show && <td>{pastLaunch.launch_success ? 'Success' : 'Failure'}</td>}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MissionTable;
