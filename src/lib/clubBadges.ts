export interface ClubBadge {
  initials: string;
  color: string;
}

// Monogram badges (initials + primary brand colour), not official crests —
// avoids reproducing trademarked club logos while still giving a visual cue.
export const clubBadges: Record<string, ClubBadge[]> = {
  "camp-nou": [{ initials: "FCB", color: "#A50044" }],
  "old-trafford": [{ initials: "MUFC", color: "#DA291C" }],
  "santiago-bernabeu": [{ initials: "RM", color: "#00529F" }],
  "san-siro": [
    { initials: "ACM", color: "#FB090B" },
    { initials: "INT", color: "#010E80" },
  ],
  "allianz-arena": [{ initials: "FCB", color: "#DC052D" }],
  "signal-iduna-park": [{ initials: "BVB", color: "#FDE100" }],
  "parc-des-princes": [{ initials: "PSG", color: "#004170" }],
  anfield: [{ initials: "LFC", color: "#C8102E" }],
  "emirates-stadium": [{ initials: "AFC", color: "#EF0107" }],
  "etihad-stadium": [{ initials: "MCFC", color: "#6CABDD" }],
  "tottenham-hotspur-stadium": [{ initials: "THFC", color: "#132257" }],
  "stamford-bridge": [{ initials: "CFC", color: "#034694" }],
  "san-mames": [{ initials: "ATH", color: "#EE2523" }],
  "wanda-metropolitano": [{ initials: "ATM", color: "#CB3524" }],
  mestalla: [{ initials: "VCF", color: "#EE3524" }],
  "estadio-da-luz": [{ initials: "SLB", color: "#E31B23" }],
  "estadio-jose-alvalade": [{ initials: "SCP", color: "#00693C" }],
  "allianz-stadium-turin": [{ initials: "JUV", color: "#000000" }],
  "stadio-olimpico": [
    { initials: "ASR", color: "#8E1F2F" },
    { initials: "SSL", color: "#87D8F7" },
  ],
  "la-bombonera": [{ initials: "CABJ", color: "#0F3D7F" }],
  "estadio-monumental": [{ initials: "CARP", color: "#E13C2E" }],
  maracana: [
    { initials: "CRF", color: "#E30613" },
    { initials: "FFC", color: "#8B0000" },
  ],
  morumbi: [{ initials: "SPFC", color: "#FE0000" }],
  "celtic-park": [{ initials: "CFC", color: "#018749" }],
  "ibrox-stadium": [{ initials: "RFC", color: "#0033A0" }],
  "johan-cruyff-arena": [{ initials: "AFC", color: "#D2122E" }],
};
