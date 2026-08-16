export interface ClubBadge {
  initials: string;
  color: string;
}

// Monogram badges (initials + primary brand colour), not official crests —
// avoids reproducing trademarked club logos while still giving a visual cue.
export const clubBadges: Record<string, ClubBadge[]> = {
  "allianz-arena": [{ initials: "FCB", color: "#DC052D" }],
  "allianz-stadium-turin": [{ initials: "JUV", color: "#000000" }],
  "camp-nou": [{ initials: "FCB", color: "#A50044" }],
  "celtic-park": [{ initials: "CF", color: "#018749" }],
  "craven-cottage": [{ initials: "FFC", color: "#000000" }],
  "de-kuip": [{ initials: "FEY", color: "#E31937" }],
  "emirat es-stadium": [{ initials: "AFC", color: "#EF0107" }],
  "estadio-da-luz": [{ initials: "SLB", color: "#E31B23" }],
  "estadio-jose-alvalade": [{ initials: "SCP", color: "#00693C" }],
  "estadio-monumental": [{ initials: "RP", color: "#FFFFFF" }],
  "etihad-stadium": [{ initials: "MCFC", color: "#6CABDD" }],
  "goodison-park": [{ initials: "EFC", color: "#003DA5" }],
  "ibrox-stadium": [{ initials: "RFC", color: "#0033A0" }],
  "johan-cruyff-arena": [{ initials: "AFC", color: "#E42313" }],
  "la-bombonera": [{ initials: "CABJ", color: "#003DA5" }],
  "london-stadium": [{ initials: "WHU", color: "#7C3C3B" }],
  "maracana": [
    { initials: "CRF", color: "#E30613" },
    { initials: "FFC", color: "#8B0000" },
  ],
  "mestalla": [{ initials: "VCF", color: "#EE3524" }],
  "morumbi": [{ initials: "SPFC", color: "#FE0000" }],
  "old-trafford": [{ initials: "MUFC", color: "#DA291C" }],
  "orange-velodrome": [{ initials: "OM", color: "#0055CC" }],
  "parc-des-princes": [{ initials: "PSG", color: "#004170" }],
  "san-mames": [{ initials: "ATH", color: "#EE2523" }],
  "san-siro": [
    { initials: "ACM", color: "#FB090B" },
    { initials: "INT", color: "#010E80" },
  ],
  "santiago-bernabeu": [{ initials: "RM", color: "#00529F" }],
  "signal-iduna-park": [{ initials: "BVB", color: "#FDE100" }],
  "st-james-park": [{ initials: "NUFC", color: "#241F20" }],
  "st-mary-s-stadium": [{ initials: "SFC", color: "#FFFFFF" }],
  "stade-de-france": [{ initials: "FFF", color: "#1B1B7A" }],
  "stade-du-roudourou": [{ initials: "EA", color: "#C8102E" }],
  "stade-geoffroy-guichard": [{ initials: "ASSE", color: "#1BA0D6" }],
  "stade-velodrome": [{ initials: "OM", color: "#0055CC" }],
  "stadio-della-juventus": [{ initials: "JUV", color: "#000000" }],
  "stadio-olimpico": [
    { initials: "ASR", color: "#8E1F2F" },
    { initials: "SS", color: "#87D8F7" },
  ],
  "stamford-bridge": [{ initials: "CFC", color: "#034694" }],
  "tottenham-hotspur-stadium": [{ initials: "THFC", color: "#132257" }],
  "wanda-metropolitano": [{ initials: "ATM", color: "#CB3524" }],
};
