import {
  FIELD_BIOME,
  GRASSLAND_BIOME,
  FOREST_BIOME,
  LAKE_BIOME,
  SWAMP_BIOME,
  MINE_BIOME
} from './constants'

const stack = [
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 0 }, { biome: LAKE_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 0 }, { biome: LAKE_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 0 }, { biome: LAKE_BIOME, crowns: 0 }],
  [
    { biome: GRASSLAND_BIOME, crowns: 0 },
    { biome: GRASSLAND_BIOME, crowns: 0 }
  ],
  [
    { biome: GRASSLAND_BIOME, crowns: 0 },
    { biome: GRASSLAND_BIOME, crowns: 0 }
  ],
  [{ biome: SWAMP_BIOME, crowns: 0 }, { biome: SWAMP_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: LAKE_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: SWAMP_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 0 }, { biome: LAKE_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 0 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: FOREST_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: LAKE_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: SWAMP_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 1 }, { biome: MINE_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: LAKE_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FOREST_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: LAKE_BIOME, crowns: 1 }, { biome: GRASSLAND_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: GRASSLAND_BIOME, crowns: 1 }],
  [{ biome: LAKE_BIOME, crowns: 0 }, { biome: GRASSLAND_BIOME, crowns: 1 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: SWAMP_BIOME, crowns: 1 }],
  [{ biome: GRASSLAND_BIOME, crowns: 0 }, { biome: SWAMP_BIOME, crowns: 1 }],
  [{ biome: MINE_BIOME, crowns: 1 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: GRASSLAND_BIOME, crowns: 2 }],
  [{ biome: LAKE_BIOME, crowns: 0 }, { biome: GRASSLAND_BIOME, crowns: 2 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: SWAMP_BIOME, crowns: 2 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: SWAMP_BIOME, crowns: 2 }],
  [{ biome: MINE_BIOME, crowns: 2 }, { biome: FIELD_BIOME, crowns: 0 }],
  [{ biome: SWAMP_BIOME, crowns: 0 }, { biome: MINE_BIOME, crowns: 2 }],
  [{ biome: SWAMP_BIOME, crowns: 0 }, { biome: MINE_BIOME, crowns: 2 }],
  [{ biome: FIELD_BIOME, crowns: 0 }, { biome: MINE_BIOME, crowns: 3 }]
]

export default stack
