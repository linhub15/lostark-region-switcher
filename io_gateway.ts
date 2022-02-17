import { readJsonSync } from "https://deno.land/x/jsonfile@1.0.0/mod.ts";
import { parse } from "https://deno.land/x/xml@2.0.4/mod.ts";
import { node } from "https://deno.land/x/xml@2.0.4/utils/types.ts";

const userOptionFilePath = "C:/Program Files (x86)/Steam/steamapps/common/Lost Ark/EFGame/Config/UserOption.xml";

function getUserOptionsFile(path: string): string {
  return Deno.readTextFileSync(path);
}

export function getRegionId():string  {
  const xml = getUserOptionsFile(userOptionFilePath);
  const userOption = parse(xml)["UserOption"] as node;
  const saveAccountOptionData = userOption["SaveAccountOptionData"] as node;
  const regionId = saveAccountOptionData["RegionID"] as node;
  return regionId.toString();
}

export function setRegion(oldRegion: string, newRegion: string) {
  const xml = getUserOptionsFile(userOptionFilePath);
  const newXml = xml.replace(
    `<RegionID>${oldRegion}</RegionID>`,
    `<RegionID>${newRegion}</RegionID>`,
  );
  Deno.writeTextFileSync(userOptionFilePath, newXml);
}
