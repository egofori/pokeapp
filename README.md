## How to run project

First install the packages int the project root:

```
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How it works

- Get list of pokemons with axios using this API endpoint: [https://pokeapi.co/api/v2/pokemon].
- Map returned data in accordion with the name and image of the pokemon in the header. (`PokemonList` component).
- Fetch and display the details of the pokemons in the accordion panel content when activated with this endpoint: [https://pokeapi.co/api/v2/pokemon/<id>].
- 16 pokemons are displayed at a time. Click the Load more button to display 16 more.
- Errors are displayed using the `antd` message feature.
- Use the `BackTop` feature to scroll to the top of the page.

## Additional libraries used
- Antd 
- Axios
- Reacting-testing-library
- Jest

## Antd components used

- Row
- Col
- Button
- BackTop
- Divider
- message
- Collapse
- Skeleton
- Descriptions
- Tag
- Badge
- Typography
- message
