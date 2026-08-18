import { useMemo, useState } from "react";
import "./App.css";

import { createPlayer } from "./engine/career/create-player";
import { createPotential } from "./engine/career/create-potential";
import { createSeasonPerformance } from "./engine/career/create-season-performance";
import { registerMatchPerformance } from "./engine/career/register-match-performance";
import { developPlayerAttributes } from "./engine/career/develop-player-attributes";
import { endSeason } from "./engine/career/end-season";

import type { Player } from "./domain/player/player";
import type { PlayerPotential } from "./domain/career/player-potential";
import type { SeasonPerformance } from "./domain/career/season-performance";

function App() {
const [player, setPlayer] = useState<Player>(() => createPlayer());

const [potential] = useState<PlayerPotential>(() => createPotential());

const [season, setSeason] = useState<SeasonPerformance>(() =>
createSeasonPerformance()
);

const overall = useMemo(() => {
const values = Object.values(player.attributes);

if (values.length === 0) {
  return 0;
}

return Math.floor(
  values.reduce((total, value) => total + value, 0) / values.length
);

}, [player.attributes]);

function playMatch() {
const goals = Math.floor(Math.random() * 3);
const assists = Math.floor(Math.random() * 2);

setSeason((current) =>
  registerMatchPerformance(current, {
    role: player.identity.primaryRole,
    goals,
    assists,
  })
);

}

function advanceSeason() {
const developedPlayer = developPlayerAttributes(
player,
season,
potential
);

const nextPlayer = endSeason(developedPlayer);

setPlayer(nextPlayer);
setSeason(createSeasonPerformance());

}

return ( <main className="game"> <header className="topbar"> <div> <span className="eyebrow">MAIOR DO ESTADO</span> <h1>ARTILHEIRO</h1> </div>

```
    <div className="season">
      <span>IDADE</span>
      <strong>{player.identity.age} anos</strong>
    </div>
  </header>

  <section className="player-card">
    <div className="player-main">
      <div className="avatar">
        {player.identity.name.charAt(0)}
      </div>

      <div>
        <span className="label">JOGADOR</span>
        <h2>{player.identity.name}</h2>

        <div className="player-info">
          <span>{player.identity.primaryPosition}</span>
          <span>{player.identity.primaryRole}</span>
          <span>
            {player.identity.dominantFoot === "right"
              ? "Destro"
              : "Canhoto"}
          </span>
        </div>
      </div>
    </div>

    <div className="overall">
      <span>GERAL</span>
      <strong>{overall}</strong>
    </div>
  </section>

  <section className="content-grid">
    <div className="panel">
      <div className="panel-header">
        <h3>Atributos</h3>
        <span>Potencial {potential.ceiling}</span>
      </div>

      <div className="attributes">
        {Object.entries(player.attributes).map(([attribute, value]) => (
          <div className="attribute" key={attribute}>
            <div className="attribute-top">
              <span>{formatAttributeName(attribute)}</span>
              <strong>{Math.floor(value)}</strong>
            </div>

            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.min(Math.max(value, 0), 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="side-column">
      <div className="panel">
        <div className="panel-header">
          <h3>Estado</h3>
        </div>

        <div className="state-list">
          <StateRow label="Saúde" value={player.state.health} />
          <StateRow label="Forma" value={player.state.formLevel} />
          <StateRow label="Confiança" value={player.state.confidence} />
          <StateRow label="Humor" value={player.state.mood} />
          <StateRow label="Pressão" value={player.state.pressure} />
          <StateRow label="Fadiga" value={player.state.fatigue} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Temporada</h3>
        </div>

        <div className="season-stats">
          <div>
            <strong>{season.matchesPlayed}</strong>
            <span>Jogos</span>
          </div>

          <div>
            <strong>{season.goals}</strong>
            <span>Gols</span>
          </div>

          <div>
            <strong>{season.assists}</strong>
            <span>Assist.</span>
          </div>
        </div>

        <div className="role">
          <span>Função predominante</span>
          <strong>{getMainRole(season)}</strong>
        </div>
      </div>
    </div>
  </section>

  <section className="actions">
    <button
      type="button"
      className="button secondary"
      onClick={playMatch}
    >
      Registrar partida
    </button>

    <button
      type="button"
      className="button primary"
      onClick={advanceSeason}
    >
      Avançar temporada →
    </button>
  </section>
</main>

);
}

function StateRow({
label,
value,
}: {
label: string;
value: number;
}) {
return ( <div className="state-row"> <div className="state-label"> <span>{label}</span> <strong>{Math.floor(value)}</strong> </div>

```
  <div className="bar">
    <div
      className="bar-fill"
      style={{
        width: `${Math.min(Math.max(value, 0), 100)}%`,
      }}
    />
  </div>
</div>

);
}

function formatAttributeName(attribute: string) {
const names: Record<string, string> = {
passing: "Passe",
finishing: "Finalização",
dribbling: "Drible",
ballControl: "Controle de bola",
crossing: "Cruzamento",
setPieces: "Bola parada",
heading: "Cabeceio",
tackling: "Desarme",
marking: "Marcação",
speed: "Velocidade",
endurance: "Resistência",
strength: "Força",
agility: "Agilidade",
vision: "Visão",
positioning: "Posicionamento",
emotionalControl: "Controle emocional",
aggression: "Agressividade",
};

return names[attribute] ?? attribute;
}

function getMainRole(season: SeasonPerformance) {
const entries = Object.entries(season.appearancesByRole);

if (entries.length === 0) {
return "—";
}

entries.sort((a, b) => b[1] - a[1]);

return entries[0][0];
}

export default App;