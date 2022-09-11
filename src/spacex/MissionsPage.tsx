import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "urql";

import { LaunchesPastResponse, Mission } from "./types/launch";
import { MissionsQuery } from "./api/graphql-client";
import { localizeTimestamp } from "../util/date";
import SuccessOrFailure from "../common/SuccessOrFailure";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface SearchResultsProps {
    offset: number;
}

const MissionsPage = ({ offset }: SearchResultsProps) => {

    const [result, reexecuteQuery] = useQuery<LaunchesPastResponse>({
        query: MissionsQuery(20, offset),
    });

    const { data, fetching, error } = result;

    if (fetching) {
        return <Spinner animation="border"/>
    }

    // if (error) {
    //     return <p>{`${t('message.error.general')} ${error.message}`}</p>;
    // }

    if (data) {
        return (
            <>
                {/*{data.launchesPast.map((pastLaunch: Mission) => (*/}
                {/*    <tr key={pastLaunch.id}>*/}
                {/*        {columnMission.show && <td>{pastLaunch.mission_name}</td>}*/}
                {/*        {columnRocket.show && <td>{pastLaunch.rocket.rocket_name}</td>}*/}
                {/*        {columnDate.show && <td>{localizeTimestamp(pastLaunch.launch_date_local, i18n.language)}</td>}*/}
                {/*        {columnLaunchSuccess.show && <td><SuccessOrFailure value={pastLaunch.launch_success}/></td>}*/}
                {/*        {columnLandSuccess.show && <td><SuccessOrFailure value={pastLaunch.rocket.first_stage.cores[0].land_success}/></td>}*/}
                {/*        <td>*/}
                {/*            <Link to={`launch/${pastLaunch.id}`}>*/}
                {/*                <Button variant="outline-info">{t('button.detail')}</Button>*/}
                {/*            </Link>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*))}*/}
            </>
        )
    }

    // if (!data) {
    //     return <p>{t('message.info.no_data')}</p>
    // }

    return (
        <div></div>
    )
}

export default MissionsPage;
