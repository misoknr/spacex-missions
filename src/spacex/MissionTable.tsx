import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';

import { LaunchesPastResponse, Mission } from './types/MissionTable';
import { MissionsQuery } from './api-client';
import SuccessOrFailure from '../common/SuccessOrFailure';

const MissionTable = () => {

    const { t } = useTranslation();

    const [columnMission, setColumnMission] = useState({
        id: 'mission',
        name: t('launch.attribute.mission_name'),
        show: true,
    });

    const [columnDate, setColumnDate] = useState({
        id: 'date',
        name: t('launch.attribute.mission_date'),
        show: true,
    });

    const [columnRocket, setColumnRocket] = useState({
        id: 'rocket',
        name: t('launch.attribute.rocket_name'),
        show: true,
    });

    const [columnLaunchSuccess, setColumnLaunchSuccess] = useState({
        id: 'launch_success',
        name: t('launch.attribute.launch'),
        show: true,
    });

    const [columnLandSuccess, setColumnLandSuccess] = useState({
        id: 'land_success',
        name: t('launch.attribute.landing'),
        show: true,
    });

    // Fetching data
    const [result, reexecuteQuery] = useQuery<LaunchesPastResponse>({
        query: MissionsQuery(20),
    });

    const { data, fetching, error } = result;

    if (fetching) {
        return <Spinner animation="border"/>
    }

    if (error) {
        return <p>{`${t('message.error.general')} ${error.message}`}</p>;
    }

    if (!data) {
        return <p>{t('message.info.no_data')}</p>
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
                        onChange={() => {
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
                        onChange={() => {
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
                        onChange={() => {
                            setColumnDate({
                                ...columnDate, show: !columnDate.show
                            });
                        }}
                    />
                    <Form.Check
                        inline
                        label={columnLaunchSuccess.name}
                        name={columnLaunchSuccess.id}
                        type="checkbox"
                        id={columnLaunchSuccess.id}
                        checked={columnLaunchSuccess.show}
                        onChange={() => {
                            setColumnLaunchSuccess({
                                ...columnLaunchSuccess, show: !columnLaunchSuccess.show
                            });
                        }}
                    />
                    <Form.Check
                        inline
                        label={columnLandSuccess.name}
                        name={columnLandSuccess.id}
                        type="checkbox"
                        id={columnLandSuccess.id}
                        checked={columnLandSuccess.show}
                        onChange={() => {
                            setColumnLandSuccess({
                                ...columnLandSuccess, show: !columnLandSuccess.show
                            });
                        }}
                    />
                </div>
            </Form>

            <Table striped variant="dark">
                <thead>
                <tr>
                    {columnMission.show && <th>{columnMission.name}</th>}
                    {columnRocket.show && <th>{columnRocket.name}</th>}
                    {columnDate.show && <th>{columnDate.name}</th>}
                    {columnLaunchSuccess.show && <th>{columnLaunchSuccess.name}</th>}
                    {columnLandSuccess.show && <th>{columnLandSuccess.name}</th>}
                    <th/>
                </tr>
                </thead>

                <tbody>
                {data.launchesPast.map((pastLaunch: Mission) => (
                    <tr key={pastLaunch.id}>
                        {columnMission.show && <td>{pastLaunch.mission_name}</td>}
                        {columnRocket.show && <td>{pastLaunch.rocket.rocket_name}</td>}
                        {columnDate.show && <td>{pastLaunch.launch_date_local}</td>}
                        {columnLaunchSuccess.show && <td><SuccessOrFailure value={pastLaunch.launch_success}/></td>}
                        {columnLandSuccess.show && <td><SuccessOrFailure value={pastLaunch.rocket.first_stage.cores[0].land_success}/></td>}
                        <td>
                            <Link to={`launch/${pastLaunch.id}`}>
                                <Button variant="outline-info">{t('button.detail')}</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MissionTable;
