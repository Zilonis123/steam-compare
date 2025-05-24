<script lang="ts">
  export let appid: number;
  export let name: string;
  export let user1Playtime: number;
  export let user2Playtime: number;

  const formatPlaytime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
</script>

<div class="card">
  <img
    class="banner"
    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`}
    alt={`Banner for ${name}`}
  />
  <div class="info">
    <h3>{name}</h3>
    <div class="playtime">
      <p><strong>User 1:</strong> {formatPlaytime(user1Playtime)}</p>
      <p><strong>User 2:</strong> {formatPlaytime(user2Playtime)}</p>
    </div>
  </div>
</div>

<style>
  .card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: #1e1e1e;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }

  .banner {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  .info {
    padding: 0.75rem;
    background-color: #292929;
    border-top: 1px solid #444;
  }

  h3 {
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
  }

  .playtime {
    font-size: 0.9rem;
    color: #ccc;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .playtime p {
    margin: 0;
  }
</style>
