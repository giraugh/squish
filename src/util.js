const rectangleObjectsOverlap = ({x: ax, y: ay, w: aw, h: ah}, {x: bx, y: by, w: bw, h: bh}) =>
  rectanglesOverlap(ax, ay, aw, ah, bx, by, bw, bh)

const rectanglesOverlap = (ax, ay, aw, ah, bx, by, bw, bh) =>
  (ax <= (bx + bw) &&
   bx <= (ax + aw) &&
   ay <= (by + bh) &&
   by <= (ay + ah))

const lerp = (a, b, t) =>
  a + ((b - a) * t)

const least = f => (acc, val) => f(val) < f(acc) ? val : acc
const most = f => (acc, val) => f(val) > f(acc) ? val : acc

module.exports = {
  rectanglesOverlap,
  rectangleObjectsOverlap,
  lerp,
  least,
  most
}
