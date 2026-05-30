import personas from '@/data/personas.json';

export interface Persona {
  id: string;
  name: string;
  age: number;
  gender: string;
  income_band: string;
  geography: {
    city: string;
    neighborhood: string;
    region_type: string;
  };
  occupation: string;
  dialect: string;
  financial_profile: {
    primary_payment: string;
    credit_card_usage: boolean;
    price_sensitivity: string;
  };
  biases_and_triggers: {
    likes: string[];
    hates: string[];
  };
}

/**
 * In the full architecture (1,500 consumer profiles), this uses K-Means clustering.
 * For the Buildfest JSON version, we filter and sample heuristically to find 
 * the most relevant 'Lead Archetypes' based on the dashboard input.
 */
export function getLeadArchetypes(
  targetGeography: string, 
  targetAgeGroup: string, 
  targetIncomeGroup: string,
  limit: number = 3
): Persona[] {
  // Map simple inputs to robust filtering logic
  let filtered = personas as Persona[];
  
  // 1. Geographic sweep
  if (targetGeography && targetGeography !== "All Regions") {
    filtered = filtered.filter(p => 
      p.geography.city.toLowerCase().includes(targetGeography.toLowerCase()) || 
      p.geography.region_type.toLowerCase().includes(targetGeography.toLowerCase())
    );
  }

  // 2. Age sweep (e.g. "18-24", "25-34", etc.)
  if (targetAgeGroup && targetAgeGroup !== "Any Age") {
    const parts = targetAgeGroup.split("-");
    if (parts.length === 2) {
      const minAge = parseInt(parts[0]);
      const maxAge = parseInt(parts[1]);
      filtered = filtered.filter(p => p.age >= minAge && p.age <= maxAge);
    }
  }

  // 3. Income sweep
  if (targetIncomeGroup && targetIncomeGroup !== "Any Income") {
    // Basic fuzzy matching for income band
    filtered = filtered.filter(p => p.income_band.toLowerCase().includes(targetIncomeGroup.toLowerCase()));
  }

  // If filters are too aggressive and return nothing, gracefully degrade to fallback archetypes
  if (filtered.length === 0) {
    console.warn("Persona Matcher: No exact matches found. Falling back to generalized local sample.");
    // Return a diverse mix
    return [personas[0], personas[1], personas[3]] as Persona[];
  }

  // Shuffle and limit to 'limit' leads
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(limit, shuffled.length));
}
