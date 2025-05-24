<script lang="ts">
  import GameDisplay from "./GameDisplay.svelte";
  import { getCommonGames } from "$lib/api/steam";
  import type { GameWithBothPlaytimes } from "$lib/types";

  let steamId1: string = "76561199578605897";
  let steamId2: string = "76561198321090953";
  let games: GameWithBothPlaytimes[] = [];
  let loading = false;
  let error: string | null = null;

  const compareGames = async () => {
    loading = true;
    error = null;

    try {
      games = await getCommonGames(steamId1, steamId2);
    } catch (e) {
      error = "Failed to fetch games. Check your Steam IDs.";
    }

    loading = false;
  };
</script>

<h1>🎮 Steam Compare</h1>
<p>Compare shared games between two Steam users</p>

<div class="form">
  <input type="text" placeholder="User 1 Steam ID" bind:value={steamId1} />
  <input type="text" placeholder="User 2 Steam ID" bind:value={steamId2} />
  <button on:click={compareGames} disabled={loading || !steamId1 || !steamId2}>
    {loading ? "Comparing..." : "Compare Games"}
  </button>
</div>

{#if error}
  <p class="error">{error}</p>
{:else if games.length}
  <div class="gameContainer">
    {#each games as game}
      <GameDisplay
        appid={game.appid}
        name={game.name}
        user1Playtime={game.user1Playtime}
        user2Playtime={game.user2Playtime}
      />
    {/each}
  </div>
{:else if !loading && steamId1 && steamId2}
  <p>No shared games found.</p>
{/if}

<style>
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
    margin-bottom: 2rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  button {
    padding: 0.6rem;
    border: none;
    background-color: #1b6ec2;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }

  button:hover:enabled {
    background-color: #155fa0;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .gameContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
</style>
