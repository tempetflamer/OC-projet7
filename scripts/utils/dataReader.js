// Fetch Data from data.json
export async function dataFetch() {
    let data = await (await fetch('../assets/data/data.json')).json();

    const dataRecipes = [...data.recipes];

    return {
        'recipes': dataRecipes
    };
}