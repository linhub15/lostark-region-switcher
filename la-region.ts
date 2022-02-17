/* usage:
 *    lostark-region            Displays list of available lostark regions
 *                              and marks the current selected region.
 *    lostark-region <region>   Sets the region
 */

import { parse } from "https://deno.land/std@0.126.0/flags/mod.ts";
import { getRegionId, setRegion } from "./io_gateway.ts";

interface Region {
  id: string;
  name: string;
}

const regions: Region[] = [
  { id: "WA", name: "us-west" },
  { id: "EA", name: "us-east" },
];

function main(args: string[]) {
  const regionArg = parse(args)._[0] as string;
  const currentRegionId = getRegionId();

  if (!regionArg) {
    return showSelectedRegions(currentRegionId);
  }

  updateSelectedRegion(currentRegionId, regionArg);
}

function showSelectedRegions(currentRegionId: string) {
  for (const region of regions) {
    const selected = currentRegionId === region.id ? " <-- selected" : "";
    console.log(`${region.id}:${region.name}${selected}`);
  }
}

function updateSelectedRegion(currentRegionId: string, regionArg: string) {
  const newRegion = regions.find((r) =>
    r.id === regionArg.toUpperCase() || r.name === regionArg
  );

  if (!newRegion) {
    console.warn(`Can't set to invalid region for: ${regionArg}`);
    return;
  }
  setRegion(currentRegionId, newRegion?.id);
  console.log(`region set to: ${newRegion.name}`);
}

main(Deno.args);
