export interface PointerExtend {
  webkit: RegExp
  [prefix: string]: RegExp
}

export function pointerExtend<PointerExtend> (dest, source) {
  for (const prop in source) {
    const prefixedPropREs = pointerExtend.prefixedPropREs
    let deprecated = false

    // skip deprecated prefixed properties
    for (const vendor in prefixedPropREs) {
      if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
        deprecated = true
        break
      }
    }

    if (!deprecated && typeof source[prop] !== 'function') {
      dest[prop] = source[prop]
    }
  }
  return dest
}

pointerExtend.prefixedPropREs = {
  webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,
}

export default pointerExtend
