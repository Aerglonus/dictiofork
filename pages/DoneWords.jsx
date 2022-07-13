import React, { useState } from 'react'
import { Table, Button } from '@nextui-org/react';
import clientPromise from "../lib/mongodb";
const DoneWords = ({ words }) => {
 const [isMemorized, setIsMemorized] = useState(words.isMemorized);
 const setMemorized = () => {
  setIsMemorized(false)
 }

 return (
  <div className=' flex justify-center items-center flex-col'>
   <div className='py-4'>
    <p className=' text-3xl font-bold'>Memorized Words</p></div>
   <Table aria-label="Example static collection table"
    css={{
     height: "auto",
     minWidth: "100%",
    }}
    selectionMode="multiple"
    sticked
    color="primary">
    <Table.Header>
     <Table.Column css={{ paddingLeft: "10px" }} >EN</Table.Column>
     <Table.Column css={{ paddingLeft: "20px" }}>KOR</Table.Column>
     <Table.Column css={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Restore</Table.Column>
    </Table.Header>
    <Table.Body>
     {words.map((wor, worIdx) => {
      return (
       <Table.Row key={worIdx}>
        <Table.Cell css={{ paddingLeft: "10px" }}>{wor.eng}</Table.Cell>
        <Table.Cell css={{ paddingLeft: "20px" }}>{wor.kor}</Table.Cell>
        <Table.Cell css={{ paddingLeft: "20px" }}>{isMemorized ? <button onClick={setMemorized} auto className='bg-red-500'>Restore?</button> : <button onClick={setIsMemorized} auto className='bg-blue-500' >Memorize</button>}</Table.Cell>
       </Table.Row>
      )
     })}
    </Table.Body>
    <Table.Pagination
     color="primary"
     shadow
     noMargin
     align="center"
     rowsPerPage={4}
     onPageChange={(page) => console.log({ page })}
    />
   </Table>
  </div>
 )
}

export default DoneWords

export async function getServerSideProps(context) {
 // `await clientPromise` will use the default database passed in the MONGODB_URI
 // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
 //
 // `const client = await clientPromise`
 // `const db = client.db("myDatabase")`
 //
 // Then you can execute queries against your database like so:
 // db.find({}) or any of the MongoDB Node Driver commands
 const client = await clientPromise;
 const db = client.db("dictionary");
 const words = await db.collection("words").find({}).toArray();
 const wordsdata = JSON.parse(JSON.stringify(words));
 return {
  props: { words: wordsdata },
 };
}