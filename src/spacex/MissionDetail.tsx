import React from 'react';
import { useTranslation, WithTranslation, withTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { useQuery } from 'urql';

import { MissionDetailQuery } from './api/graphql-client';
import { Core, FirstStage, LaunchResponse, Payload, SecondStage } from './types/launch';
import Label from '../common/Label';
import SuccessOrFailure from '../common/SuccessOrFailure';
import { localizeTimestamp } from '../util/date';

type FirstStageCompProps = {
    data: FirstStage;
} & WithTranslation;

type SecondStageCompProps = {
    data: SecondStage;
} & WithTranslation;

const FirstStageComp = withTranslation()(({ data, t }: FirstStageCompProps) => (
    <div>
        <div className="section">
            <span>{t('common.first_stage')}</span>
        </div>

        {data.cores.map((core: Core, i: number) => (
            <div key={`core-${i}`}>
                <div className="subsection">
                    <span className="attr">{`${t('common.core')} #${i + 1}`}</span>
                </div>
                <div>
                    <Label className="attr" translation="launch.attribute.flight_number"/>
                    <span className="data">{core.flight}</span>
                </div>
                <div>
                    <Label className="attr" translation="launch.attribute.reuse_count"/>
                    <span className="data">{core.core.reuse_count}</span>
                </div>
                <div>
                    <Label className="attr" translation="launch.attribute.landing"/>
                    <span className="data"><SuccessOrFailure value={core.land_success}/></span>
                </div>
            </div>
        ))}
    </div>
))

const SecondStageComp = withTranslation()(({ data, t }: SecondStageCompProps) => (
    <div>
        <div className="section">
            <span>{t('common.second_stage')}</span>
        </div>

        {data.payloads.map((payload: Payload, i: number) => (
            <div key={`payload-${i}`}>
                <div className="subsection">
                    <span className="attr">{`${t('common.payload')} #${i + 1}`}</span>
                </div>
                <div>
                    <Label className="attr" translation="launch.attribute.payload_type"/>
                    <span className="data">{payload.payload_type}</span>
                </div>
                <div>
                    <Label className="attr" translation="launch.attribute.payload_weight"/>
                    {payload.payload_mass_kg ? (
                        <span className="data">{`${payload.payload_mass_kg} kg`}</span>
                    ) : (
                        <span className="data">{t('common.not_available')}</span>
                    )}
                </div>
            </div>
        ))}
    </div>
));

const MissionDetail = () => {
    const { t, i18n } = useTranslation();
    const params = useParams();

    // Fetching data
    const [result] = useQuery<LaunchResponse>({
        query: MissionDetailQuery(params.id),
    });

    const { data, fetching, error } = result;

    if (fetching) {
        return <Spinner animation="border"/>
    }

    if (error) {
        return <p>Something went wrong... {error.message}</p>;
    }

    if (!data) {
        return <p>Sorry, no data...</p>
    }

    return (
        <Container>
            <Row style={{ paddingBottom: '50px' }}>
                <Col>
                    <div className="mission-header">
                        <Link className="back" to="/"><Button variant="light">{t('button.back')}</Button></Link>
                        <h2>{`${t('launch.attribute.mission_name')}: ${data.launch.mission_name}`}</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="mission-details">
                        <Row>
                            <Col>
                                <div>
                                    <Label className="attr" translation="launch.attribute.mission_date"/>
                                    <span className="data">{localizeTimestamp(data.launch.launch_date_local, i18n.language)}</span>
                                </div>
                                <div>
                                    <Label className="attr" translation="launch.attribute.mission_date"/>
                                    <span className="data">{data.launch.rocket.rocket_name}</span>
                                </div>
                                <div>
                                    <Label className="attr" translation="launch.attribute.article"/>
                                    {data.launch.links.article_link ? (
                                        <a href={data.launch.links.article_link} target="_blank">{data.launch.links.article_link}</a>
                                    ) : (
                                        <span className="data">{t('common.not_available')}</span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FirstStageComp data={data.launch.rocket.first_stage}/>
                            </Col>
                            <Col>
                                <SecondStageComp data={data.launch.rocket.second_stage}/>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col>
                    <YouTube videoId={data.launch.links.video_link.split('youtu.be/')[1]}/>
                </Col>
            </Row>
        </Container>
    )
};

export default MissionDetail;
