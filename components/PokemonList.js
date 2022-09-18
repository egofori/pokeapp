import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import {
    Row,
    Col,
    Collapse,
    Skeleton,
    Descriptions,
    Tag,
    Badge,
    Typography,
    message,
} from "antd";
import { getPokemonDetails } from "../utils/services";
import { capitaliseFirstLetter } from "../utils";
import styles from "./PokemonList.module.css";

const { Panel } = Collapse;

const PokemonList = ({ pokemonCreatures }) => {
    // URL to the pokemon images
    const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    // For when details are loading
    const [detailsLoading, setDetailsLoading] = useState(false);
    // Contains deatils of a pokemon at a time
    const [details, setDetails] = useState(null);
    // Holds the key of expanded panel
    const [activeKey, setActiveKey] = useState(null);

    // For ref of "Details:" heading
    const detailsRef = useRef(null);

    // When a panel is expanded
    const onChange = (key) => {
        if (key === undefined) {
            // if a panel is collapsed remove activeKey 
            setActiveKey(null);
            return;
        } else {
            // else save the key as activeKey
            setActiveKey(key);
        }
        setDetailsLoading(true);
        // clear old details
        setDetails(null);
        // Make api call to get details of pokemon
        getPokemonDetails(key)
            .then((response) => {
                setDetails(response.data);
                setDetailsLoading(false);
                // Scroll to view details
                detailsRef.current.scrollIntoView({ behavior: "smooth" });
            })
            .catch((error) => {
                message.error("Error while trying to load details.");
                setDetailsLoading(false);
            });
    };

    return (
        <Collapse
            onChange={onChange}
            expandIconPosition="end"
            accordion
        >
            {pokemonCreatures.map(({ name, url }) => {
                const pokemonId = url.split("/")[url.split("/").length - 2];
                return (
                    <Panel
                        key={pokemonId}
                        style={activeKey == pokemonId ? { transform: "scale(1)" } : {}}
                        className={styles.panel}
                        header={
                            activeKey == pokemonId ? (
                                <Typography.Title
                                    level={3}
                                    style={{ marginLeft: 10 }}
                                    ref={activeKey == pokemonId ? detailsRef : null}
                                >
                                    Details:
                                </Typography.Title>
                            ) : (
                                <Row
                                    className={styles.listHeader}
                                    justify="start"
                                    align="middle"
                                >
                                    <Col>
                                        <Image
                                            src={`${imgURL}${pokemonId}.png`}
                                            alt={name}
                                            height={50}
                                            width={50}
                                        />
                                    </Col>
                                    <Col>
                                        <Typography.Title level={5} style={{ marginLeft: 10 }}>
                                            {capitaliseFirstLetter(name)}
                                        </Typography.Title>
                                    </Col>
                                </Row>
                            )
                        }
                    >
                        {detailsLoading ? (
                            <Skeleton active />
                        ) : details === null ? (
                            "Try again."
                        ) : (
                            <Row justify="center">
                                <Col className={styles.centerItems}>
                                    <Image
                                        src={`${imgURL}${pokemonId}.png`}
                                        alt="Pokemon Image"
                                        height={200}
                                        width={200}
                                    />
                                    <Typography.Title
                                        level={3}
                                        style={{ textAlign: "center", marginBottom: 30 }}
                                    >
                                        {capitaliseFirstLetter(name)}
                                    </Typography.Title>
                                </Col>
                                <Col span={24}>
                                    <Descriptions bordered column={1}>
                                        <Descriptions.Item label="Species">
                                            {capitaliseFirstLetter(details.species.name)}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Base Stats">
                                            <ul>
                                                {details.stats.map((item) => (
                                                    <li key={item.stat.name}>
                                                        {capitaliseFirstLetter(item.stat.name)}{" "}
                                                        <Badge status="default" />
                                                        <Tag color="orange">{item.base_stat}</Tag>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Types">
                                            <ul>
                                                {details.types.map((item) => (
                                                    <li key={item.slot}>
                                                        {capitaliseFirstLetter(item.type.name)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Weight">
                                            {details.weight} lbs
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Moves">
                                            <ul>
                                                {details.moves.slice(0, 12).map((item) => (
                                                    <li key={item.move.name}>
                                                        {capitaliseFirstLetter(item.move.name)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        )}
                    </Panel>
                );
            })}
        </Collapse>
    );
};

PokemonList.propTypes = {
    pokemonCreatures: PropTypes.array.isRequired,
};

export default PokemonList;
