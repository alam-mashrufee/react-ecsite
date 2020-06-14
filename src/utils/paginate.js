import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  console.log(items, pageNumber, pageSize);
  const startIndx = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndx).take(pageSize).value();
}
