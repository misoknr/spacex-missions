import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';

import { LaunchesPastResponse, Mission } from './types/launch';
import { MissionsQuery } from './api/graphql-client';
import SuccessOrFailure from '../common/SuccessOrFailure';
import { localizeTimestamp } from '../util/date';

const MissionTable = () => {

    const { t, i18n } = useTranslation();

    const [columnMission, setColumnMission] = useState({
        id: 'mission',
        labelCode: 'launch.attribute.mission_name',
        show: true,
    });

    const [columnDate, setColumnDate] = useState({
        id: 'date',
        labelCode: 'launch.attribute.mission_date',
        show: true,
    });

    const [columnRocket, setColumnRocket] = useState({
        id: 'rocket',
        labelCode: 'launch.attribute.rocket_name',
        show: true,
    });

    const [columnLaunchSuccess, setColumnLaunchSuccess] = useState({
        id: 'launch_success',
        labelCode: 'launch.attribute.launch',
        show: true,
    });

    const [columnLandSuccess, setColumnLandSuccess] = useState({
        id: 'land_success',
        labelCode: 'launch.attribute.landing',
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
                    <Form.Switch
                        inline
                        label={t(columnMission.labelCode)}
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
                    <Form.Switch
                        inline
                        label={t(columnRocket.labelCode)}
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
                    <Form.Switch
                        inline
                        label={t(columnDate.labelCode)}
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
                    <Form.Switch
                        inline
                        label={t(columnLaunchSuccess.labelCode)}
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
                    <Form.Switch
                        inline
                        label={t(columnLandSuccess.labelCode)}
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
                    {columnMission.show && <th>{t(columnMission.labelCode)}</th>}
                    {columnRocket.show && <th>{t(columnRocket.labelCode)}</th>}
                    {columnDate.show && <th>{t(columnDate.labelCode)}</th>}
                    {columnLaunchSuccess.show && <th>{t(columnLaunchSuccess.labelCode)}</th>}
                    {columnLandSuccess.show && <th>{t(columnLandSuccess.labelCode)}</th>}
                    <th/>
                </tr>
                </thead>

                <tbody>
                {data.launchesPast.map((pastLaunch: Mission) => (
                    <tr key={pastLaunch.id}>
                        {columnMission.show && <td>{pastLaunch.mission_name}</td>}
                        {columnRocket.show && <td>{pastLaunch.rocket.rocket_name}</td>}
                        {columnDate.show && <td>{localizeTimestamp(pastLaunch.launch_date_local, i18n.language)}</td>}
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
