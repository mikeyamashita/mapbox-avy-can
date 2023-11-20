import { Button } from "@nextui-org/button";
import Link from 'next/link'

import { getAreasDTO } from './data/area-dto';

export default async function Page() {
  console.log('console log', await getAreasDTO())

  return <Link href="/map">map</Link>
}