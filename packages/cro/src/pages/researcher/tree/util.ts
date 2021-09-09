export function expand(d) {
  if (d._children) {
    d.children = d._children;
    d.children.forEach(expand);
    d._children = null;
  }
}

export function collapse(d, arr) {
  if (d.children && d.children.length != 0) {
    d._children = d.children;
    d._children.forEach((d) => collapse(d, arr));
    d.children = null;
    arr.push(d);
  }
}

export function sortByDate(a, b) {
  const d3 = window.d3;
  var aNum = a.name.substr(a.name.lastIndexOf('(') + 1, 4);
  var bNum = b.name.substr(b.name.lastIndexOf('(') + 1, 4);
  return d3.ascending(aNum, bNum) || d3.ascending(a.name, b.name) || d3.ascending(a.id, b.id);
}
