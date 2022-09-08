import React from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';


const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    return (
        <ToggleButtonGroup type="radio" name="languages" defaultValue={i18n.language} onChange={value => i18n.changeLanguage(value)}>
            <ToggleButton id="radio-en" value="en" variant="outline-danger">{t('button.language.en')}</ToggleButton>
            <ToggleButton id="radio-sk" value="sk" variant="outline-danger">{t('button.language.sk')}</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default LanguageSelector;
