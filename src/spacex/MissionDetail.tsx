import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';
import { useQuery } from "urql";

import { MissionDetailQuery } from "./api-client";
import { Core, Payload } from "./types/MissionTable";

const MissionDetail = () => {
    let params = useParams();

    // Fetching data
    const [result, reexecuteQuery] = useQuery({
        query: MissionDetailQuery(params.id),
    });

    const {data, fetching, error} = result;

    if (fetching) {
        return <Spinner animation="border"/>
    }

    if (error) {
        return <p>Something went wrong... {error.message}</p>;
    }

    return (
        <Container>
            <Row style={{paddingBottom: '50px'}}>
                <h2>Mission: {data.launch.mission_name}</h2>
            </Row>
            <Row>
                <Col>
                    <div className="mission-details">
                        <div>
                            <span className="attr">Mission date: </span>
                            <span>{data.launch.launch_date_local}</span>
                        </div>
                        <div>
                            <span className="attr">Rocket: </span>
                            <span>{data.launch.rocket.rocket_name}</span>
                        </div>
                        <div className="section">
                            <span>First stage</span>
                        </div>

                        {data.launch.rocket.first_stage.cores.map((core: Core, i: number) => (
                            <div>
                                <div className="subsection">
                                    <span className="attr">Core #{i + 1}</span>
                                </div>
                                <div>
                                    <span className="attr">Flight number: </span>
                                    <span>{core.flight}</span>
                                </div>
                                <div>
                                    <span className="attr">Reuse count: </span>
                                    <span>{core.core.reuse_count}</span>
                                </div>
                                <div>
                                    <span className="attr">Land success: </span>
                                    <span>{core.land_success}</span>
                                </div>
                            </div>
                        ))}

                        <div className="section">
                            <span>Second stage</span>
                        </div>

                        {data.launch.rocket.second_stage.payloads.map((payload: Payload, i: number) => (
                            <div>
                                <div className="subsection">
                                    <span className="attr">Payload #{i + 1}</span>
                                </div>
                                <div>
                                    <span className="attr">Payload type: </span>
                                    <span>{payload.payload_type}</span>
                                </div>
                                <div>
                                    <span className="attr">Payload weight: </span>
                                    {payload.payload_mass_kg ? (
                                        <span>{`${payload.payload_mass_kg} kg`}</span>
                                    ) : (
                                        <span>Unknown</span>
                                    )}
                                </div>
                            </div>
                        ))}
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
