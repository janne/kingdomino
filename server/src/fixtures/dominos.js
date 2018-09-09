import {
  FIELD_BIOME,
  GRASSLAND_BIOME,
  FOREST_BIOME,
  LAKE_BIOME,
  SWAMP_BIOME,
  MINE_BIOME
} from '../constants'

export default [
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 1 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 0 }]
]
