import React from 'react';
import { useTranslation } from 'react-i18next';

interface AttributeLabelProps {
    className?: string
    translation: string
}

const Label = (props: AttributeLabelProps) => {

    const { className, translation } = props;
    const { t } = useTranslation();

    return (
        <span className={className}>{`${t(translation)}: `}</span>
    )
}

export default Label;
