const getLimits = lands =>
  lands.reduce(
    (acc, land) => ({
      min: {
        x: Math.min(acc.min.x, land.x),
        y: Math.min(acc.min.y, land.y)
      },
      max: {
        x: Math.max(acc.max.x, land.x),
        y: Math.max(acc.max.y, land.y)
      }
    }),
    { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } }
  )

export default getLimits
