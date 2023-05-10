import { Row, Col, Button, BackTop, Divider, message } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getPokemonCreatures } from "../utils/services";
import PokemonList from "../components/PokemonList";

export default function Home() {
  const [pokemonCreatures, setPokemonCreatures] = useState([]);
  const [nextListLoading, setNextListLoading] = useState(false);

  // contains API call to load pokemons data list
  const loadPokemons = (onSuccess, onFailure) =>
    getPokemonCreatures(16, pokemonCreatures.length)
      .then((response) => {
        setPokemonCreatures(pokemonCreatures.concat(response.data.results));
        if (onSuccess) onSuccess(response);
      })
      .catch((error) => {
        message.error(
          "Error occured while trying to load pokemons. Please try again."
        );
        if (onFailure) onFailure(error);
      });

  // fetches next 16 pokemons 
  const handleNextList = () => {
    setNextListLoading(true);
    loadPokemons(() => setNextListLoading(false), () => setNextListLoading(false));
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
        <meta
          name="description"
          content="A web app that lets users discover and browse through all Pokémon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        Welcome to <span>PokeApp!</span>
      </h1>
      <p className={styles.description}>
        Discover and browse through all Pokémons.
      </p>
      <Divider className={styles.dividerTop} />
      <Row className={styles.main} justify="space-around">
        <Col lg={14} xs={24} md={18}>
          {pokemonCreatures.length == 0 ? (
            <p className={styles.noPokemons}>
              No pokemons? Something must be wrong. Refresh the page to try
              again.
            </p>
          ) : (
            <>
              <PokemonList pokemonCreatures={pokemonCreatures} />
              <Row justify="center">
                {pokemonCreatures.length < 1154 && (
                  <Button
                    onClick={handleNextList}
                    loading={nextListLoading}
                    className={styles.loadBtn}
                  >
                    Load more
                  </Button>
                )}
              </Row>
              <BackTop />
            </>
          )}
        </Col>
      </Row>
      <footer className={styles.footer}>
        Made with ❤ by&nbsp;
        <a
          href="https://github.com/egofori/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Egofori
        </a>
      </footer>
    </div>
  );
}
