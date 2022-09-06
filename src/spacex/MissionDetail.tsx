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
                    <Row>
                        <Col>Rocket</Col>
                        <Col>{data.launch.rocket.rocket_name}</Col>
                    </Row>
                    <Row>
                        <Col>First stage </Col>
                    </Row>

                    {data.launch.rocket.first_stage.cores.map((core: Core, i: number) => (
                        <>
                            <Row><Col>Core #{i}</Col></Row>
                            <Row>
                                <Col>Flight number</Col>
                                <Col>{core.flight}</Col>
                            </Row>
                            <Row>
                                <Col>Reuse count</Col>
                                <Col>{core.core.reuse_count}</Col>
                            </Row>
                            <Row>
                                <Col>Land success</Col>
                                <Col>{core.land_success}</Col>
                            </Row>
                        </>
                    ))}

                    <Row>
                        <Col>Second stage</Col>
                    </Row>
                    {data.launch.rocket.second_stage.payloads.map((payload: Payload, i: number) => (
                        <>
                            <Row><Col>Payload #{i}</Col></Row>
                            <Row>
                                <Col>Payload type</Col>
                                <Col>{payload.payload_type}</Col>
                            </Row>
                            <Row>
                                <Col>Payload weight</Col>
                                <Col>{`${payload.payload_mass_kg} kg`}</Col>
                            </Row>
                        </>
                    ))}
                </Col>
                <Col>
                    <YouTube videoId={data.launch.links.video_link.split('youtu.be/')[1]}/>
                </Col>
            </Row>
        </Container>
    )
};

export default MissionDetail;
