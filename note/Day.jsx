import React from 'react'
import clientPromise from "../lib/mongodb";
const Day = ({ words, day }) => {
 return (
  <>
   <h2>Day {day}</h2>
   <table>
    <tbody>
     {words.map((wor, worIdx) => {
      return (
       <tr key={worIdx}>
        <td >
         <input type="checkbox" ></input>
        </td>
        <td>{wor.kor}</td>
        <td>{wor.eng}</td>
        <td>
         <button >
          Definition
         </button>
         <button>Delete</button>
        </td>
       </tr>
      )
     })}
    </tbody>
   </table>
  </>
 )
}

export default Day
export async function getServerSideProps(context) {
 const client = await clientPromise;
 const db = client.db("dictionary");
 const words = await db.collection("words").find({}).toArray();
 const days = await db.collection("days").find({}).toArray();
 const wordsdata = JSON.parse(JSON.stringify(words));
 const daysdata = JSON.parse(JSON.stringify(days));
 return {
  props: { words: wordsdata, days: daysdata },
 };
}