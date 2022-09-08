import React from 'react';
import { useTranslation } from 'react-i18next';
import MissionTable from './MissionTable';

const MissionList = () => {
    const { t } = useTranslation();

    return (
        <div className="mission-list">
            <h1>{t('list.header')}</h1>
            <MissionTable/>
        </div>
    )
}

export default MissionList;
