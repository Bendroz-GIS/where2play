import { getDomain } from "../models/domainModel"
import { listDomain } from "../config/domainConfig"

async function enhanceDomain() {
  for (const domain of listDomain) { 
    const json = await getDomain(domain);
    domain["data"] = json
  } 
}


export { enhanceDomain }