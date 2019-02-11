import * as C from './constant';

export default (o: any, c: any, d: any) => {
  const proto = c.prototype;
  d.en.relativeTime = {
    future: 'in %s',
    past: '%s',
    s: 'a few seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  };
  const fromTo = (
    input: any,
    withoutSuffix: any,
    instance: any,
    isFrom?: any
  ) => {
    const loc = instance.$locale().relativeTime;
    const T = [
      { l: 's', r: 44, d: C.S },
      { l: 'm', r: 89 },
      { l: 'mm', r: 44, d: C.MIN },
      { l: 'h', r: 89 },
      { l: 'hh', r: 21, d: C.H },
      { l: 'd', r: 35 },
      { l: 'dd', r: 25, d: C.D },
      { l: 'M', r: 45 },
      { l: 'MM', r: 10, d: C.M },
      { l: 'y', r: 17 },
      { l: 'yy', d: C.Y }
    ];
    const Tl = T.length;
    let result;
    let out;

    for (let i = 0; i < Tl; i += 1) {
      const t = T[i];
      if (t.d) {
        result = isFrom
          ? d(input).diff(instance, t.d, true)
          : instance.diff(input, t.d, true);
      }
      const abs = Math.ceil(Math.abs(result));
      if (t.r) {
        if (abs <= t.r || !t.r) {
          out = loc[t.l].replace('%d', abs);
          break;
        }
      }
    }
    if (withoutSuffix) {
      return out;
    }
    return (result > 0 ? loc.future : loc.past).replace('%s', out);
  };
  proto.to = function(input: any, withoutSuffix: any) {
    return fromTo(input, withoutSuffix, this, true);
  };
  proto.from = function(input: any, withoutSuffix: any) {
    return fromTo(input, withoutSuffix, this);
  };
  proto.toNow = function(withoutSuffix: any) {
    return this.to(d(), withoutSuffix);
  };
  proto.fromNow = function(withoutSuffix: any) {
    return this.from(d(), withoutSuffix);
  };
};
