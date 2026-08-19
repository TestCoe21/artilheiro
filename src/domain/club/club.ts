export type ClubDivision =
  | "serie-a"
  | "serie-b"
  | "other";

export type BrazilianRegional =
  | "nordeste"
  | "sul-sudeste"
  | "verde"
  | null;

export type BrazilianState =
  | "AL"
  | "BA"
  | "CE"
  | "PA"
  | "PR"
  | "SP"
  | "RJ"
  | "SC"
  | "RS"
  | "GO"
  | "MT"
  | "MG"
  | "PE"
  | "ES"
  | "DF"
  | "PB"
  | "SE"
  | "PI"
  | "RN"
  | "MA"
  | "AM"
  | "RO"
  | "RR"
  | "AC"
  | "AP"
  | "TO";

export interface Club {
  id: string;
  name: string;
  country: string;
  state: BrazilianState | null;

  division: ClubDivision;

  strength: number;

  selectable: boolean;

  stateChampionship: string | null;
  regionalChampionship: BrazilianRegional;
}
