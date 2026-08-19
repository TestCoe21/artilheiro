import { useMemo, useState } from "react";
import "./App.css";

import { createPlayer } from "./engine/career/create-player";
import { createSeasonPerformance } from "./engine/career/create-season-performance";
import { registerMatchPerformance } from "./engine/career/register-match-performance";
import { developPlayerAttributes } from "./engine/career/develop-player-attributes";

import { calculateStartingChance } from "./engine/selection/calculate-starting-chance";
import { calculateSubstituteChance } from "./engine/selection/calculate-substitute-chance";
import { calculateInGameSubstitutionChance } from "./engine/selection/calculate-in-game-substitution-chance";
import { calculateSubstitutionMinuteModifier } from "./engine/selection/calculate-substitution-minute-modifier";

import type { Player } from "./domain/player/player";
import type { SeasonPerformance } from "./domain/career/season-performance";

import { resetPlayerStateForNewSeason } from "./engine/career/reset-player-state-for-new-season";

function App() {
  const [player, setPlayer] = useState<Player>(() => createPlayer());

  const [season, setSeason] = useState<SeasonPerformance>(() =>
    createSeasonPerformance()
  );

  const [clubStrength, setClubStrength] = useState(70);
  const [coachRelationship, setCoachRelationship] = useState(60);
  const [matchMinute, setMatchMinute] = useState(45);

  const overall = useMemo(() => {
    const values = Object.values(player.attributes);

    if (values.length === 0) {
      return 0;
    }

    return Math.floor(
      values.reduce((total, value) => total + value, 0) / values.length
    );
  }, [player.attributes]);

  const startingChance = calculateStartingChance(
    overall,
    clubStrength,
    "first_division",
    player.state.fatigue,
    coachRelationship
  );

  const substituteChance = calculateSubstituteChance(
    overall,
    clubStrength,
    "first_division",
    player.state.fatigue,
    coachRelationship
  );

  const inGameChance = calculateInGameSubstitutionChance(
    overall,
    clubStrength,
    "first_division",
    player.state.fatigue,
    coachRelationship,
    matchMinute
  );

  const minuteModifier = calculateSubstitutionMinuteModifier(matchMinute);

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
      season
    );

    const playerWithNewState = {
      ...developedPlayer,
      state: resetPlayerStateForNewSeason(developedPlayer.state),
      identity: {
        ...developedPlayer.identity,
        age: developedPlayer.identity.age + 1,
      },
    };

    setPlayer(playerWithNewState);
    setSeason(createSeasonPerformance());
  }

  return (
    <main className="game">
      <header className="topbar">
        <div>
          <span className="eyebrow">MAIOR DO ESTADO</span>
          <h1>ARTILHEIRO</h1>
        </div>

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
            <span>Potencial {player.potential.ceiling}</span>
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

      <section className="panel selection-panel">
        <div className="panel-header">
          <div>
            <h3>Seleção para a partida</h3>
            <p className="panel-description">
              O treinador avalia o jogador com base em nível, competição,
              relacionamento e fadiga.
            </p>
          </div>

          <span className="system-tag">SISTEMA ATIVO</span>
        </div>

        <div className="selection-controls">
          <Control
            label="Força do clube"
            value={clubStrength}
            min={0}
            max={100}
            onChange={setClubStrength}
          />

          <Control
            label="Relacionamento com treinador"
            value={coachRelationship}
            min={0}
            max={100}
            onChange={setCoachRelationship}
          />

          <Control
            label="Minuto da partida"
            value={matchMinute}
            min={0}
            max={90}
            onChange={setMatchMinute}
          />
        </div>

        <div className="selection-results">
          <ChanceCard
            label="Titular"
            value={startingChance}
            description="Chance de começar a partida"
          />

          <ChanceCard
            label="Reserva"
            value={substituteChance}
            description="Chance de ficar disponível no banco"
          />

          <ChanceCard
            label="Entrar"
            value={inGameChance}
            description={`Chance aos ${matchMinute}'`}
          />
        </div>

        <div className="match-info">
          <div>
            <span>Fadiga atual</span>
            <strong>{Math.floor(player.state.fatigue)}%</strong>
          </div>

          <div>
            <span>Modificador do minuto</span>
            <strong>
              {minuteModifier > 0 ? `+${minuteModifier}` : minuteModifier}
            </strong>
          </div>

          <div>
            <span>Regra especial</span>
            <strong>
              {player.state.fatigue >= 95
                ? "Impedido por fadiga"
                : "Elegível"}
            </strong>
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

function ChanceCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="chance-card">
      <div className="chance-card-top">
        <span>{label}</span>
        <strong>{Math.floor(value)}%</strong>
      </div>

      <div className="bar">
        <div
          className="bar-fill"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>

      <small>{description}</small>
    </div>
  );
}

function Control({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="control">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function StateRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="state-row">
      <div className="state-label">
        <span>{label}</span>
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