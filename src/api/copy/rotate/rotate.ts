const RAD = [0, 90, 180, 270]

function left(rotation: number) {
  if (!RAD.includes(rotation)) throw new Error(`Wrong rotation value: "${rotation}"`)
  const angle = rotation === 0 ? 270 : rotation - 90
  return angle
}

function right(rotation: number) {
  if (!RAD.includes(rotation)) throw new Error(`Wrong rotation value: "${rotation}"`)
  const angle = rotation === 270 ? 0 : rotation + 90
  return angle
}

function turn(rotation: number) {
  if (!RAD.includes(rotation)) throw new Error(`Wrong rotation value: "${rotation}"`)
  let angle = rotation + 180
  if (angle >= 360) angle -= 360
  return angle
}
