import React  from 'react';
import { useTranslation } from 'react-i18next';

const SuccessOrFailure = (props: { value: boolean | null }) => {

    const { t } = useTranslation();

    return (
        <span>{t(`common.${props.value ? 'success' : 'failure'}`)}</span>
    )
}

export default SuccessOrFailure;
