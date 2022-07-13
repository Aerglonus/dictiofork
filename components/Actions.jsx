import React from 'react'
import { Button, Container } from "@nextui-org/react";
import Link from 'next/link';

const Actions = () => {
 return (
  <div className="mx-auto flex flex-col items-center justify-center mt-[70px]">
   <h1 className="font-bold text-2xl xl:text-4xl  tracking-wide	py-1">
    Advanced Korean Vocabulary
   </h1>
   <Container className="flex flex-wrap items-center justify-center gap-x-5 py-4">
    <Link href="/CreateWord">
     <Button className=" tracking-wide bg-black rounded-md text-white p-[10px]">
      Add Words
     </Button>
    </Link>
    <Button className=" rounded-md bg-black text-white p-[10px] tracking-wide">
     Add Days
    </Button>
    <Link href="/DoneWords">
     <Button className=" my-2 bg-black rounded-md text-white p-[10px] tracking-wide">
      Finished Words
     </Button>
    </Link>
   </Container>
  </div>
 )
}

export default Actions