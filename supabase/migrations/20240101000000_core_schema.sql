-- Enable pgvector extension for the RAG Learning Engine
CREATE EXTENSION IF NOT EXISTS vector;

-- Enums for our deeply expanded demographic clusters
CREATE TYPE age_cohort AS ENUM ('Gen-Alpha (<13)', 'Gen-Z (13-24)', 'Millennials (25-40)', 'Gen-X (41-55)', 'Boomers (56-70)', 'Elders (71+)');
CREATE TYPE sec_bracket AS ENUM ('UHNW', 'Upper Middle', 'Middle', 'Lower Middle', 'Skilled Working', 'Unskilled Labor', 'Rural Agrarian');
CREATE TYPE geo_division AS ENUM ('Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh');
CREATE TYPE location_type AS ENUM ('Urban Core', 'Suburban', 'Rural');
CREATE TYPE asset_type_enum AS ENUM ('TVC', 'OVC', 'Omnichannel', 'Static Poster', 'Caption/Copy');

-- Table: Archetypes (The 50 Deep Core Agents)
CREATE TABLE archetypes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype_name VARCHAR(255) NOT NULL, -- e.g., "The Sylheti Rural Patriarch"
  age_cohort age_cohort NOT NULL,
  sec_bracket sec_bracket NOT NULL,
  geo_division geo_division NOT NULL,
  location_type location_type NOT NULL,
  dialect VARCHAR(100) NOT NULL,
  cultural_taboos TEXT[] NOT NULL,
  core_desires TEXT[] NOT NULL,
  tech_savviness INT NOT NULL CHECK (tech_savviness BETWEEN 1 AND 10),
  -- Used for statistical extrapolation to N=1500 based on census data
  base_weight_multiplier FLOAT NOT NULL DEFAULT 1.0, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Cultural Memory (The RAG Vector DB for >92% Accuracy)
CREATE TABLE cultural_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  context_text TEXT NOT NULL, -- The transcript/comment/insight
  source_type VARCHAR(100) NOT NULL, -- e.g., 'Focus Group', 'FB Comments', 'Agency RLHF Correction'
  embedding vector(768), -- Gemini 2.5 Pro output dimension for text embedding
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Campaigns (Client Uploads)
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- Will reference auth.users in production
  campaign_name VARCHAR(255) NOT NULL,
  asset_type asset_type_enum NOT NULL,
  asset_url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Simulation Results
CREATE TABLE simulation_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  -- We split feedback directly in the DB
  tvc_specific_feedback JSONB, 
  ovc_specific_feedback JSONB,
  static_design_feedback JSONB, -- For conceptual artist level feedback
  grammarly_caption_suggestions JSONB, -- For the smart copy engine
  risk_index_score INT,
  virality_score INT,
  generational_resonance INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
