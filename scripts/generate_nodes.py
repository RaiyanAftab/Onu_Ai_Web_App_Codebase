import json
import random
import uuid

archetypes = ["GenZ", "Millennial", "Boomer", "GenX", "Alpha", "Corporate", "Creative", "Analytical", "Trendy", "Conservative"]
industries = ["Tech", "Fashion", "Finance", "Healthcare", "Entertainment", "FMCG", "Automotive", "B2B", "Education", "Travel"]
biases = ["Confirmation", "Anchoring", "Availability", "Halo Effect", "Bandwagon", "Loss Aversion", "Framing", "Recency"]
tone_modifiers = ["Sarcastic", "Enthusiastic", "Skeptical", "Academic", "Casual", "Urgent", "Empathetic", "Direct", "Playful"]

nodes = {}

for i in range(1, 1501):
    node_id = f"node_{uuid.uuid4().hex[:12]}"
    nodes[node_id] = {
        "id": node_id,
        "type": random.choice(["heuristic_weight", "semantic_cluster", "bias_injector", "demographic_matrix", "sentiment_analyzer"]),
        "activation_threshold": round(random.uniform(0.1, 0.99), 4),
        "parameters": {
            "archetype_affinity": random.choice(archetypes),
            "industry_context": random.choice(industries),
            "cognitive_bias": random.choice(biases),
            "linguistic_tone": random.choice(tone_modifiers)
        },
        "neural_weights": [round(random.uniform(-1.0, 1.0), 5) for _ in range(8)],
        "connections": [f"node_{uuid.uuid4().hex[:12]}" for _ in range(random.randint(2, 6))],
        "metadata": {
            "version": "1.0",
            "last_optimized": f"2026-05-{random.randint(10, 29)}T{random.randint(10,23)}:{random.randint(10,59)}:00Z"
        }
    }

with open('neural_graph_nodes.json', 'w') as f:
    json.dump(nodes, f, indent=2)

print("Generated neural_graph_nodes.json with 1500 nodes.")
