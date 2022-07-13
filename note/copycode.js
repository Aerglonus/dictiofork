	<label>Select Day</label>
						<select
							className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							value={dayState}
							onChange={(e) => setDayState(e.target.value)}>
							{days.map((dayz, dayzIdx) => {
								return (
									<option key={dayz.id} value={dayz.day}>
										Day {dayz.day}
									</option>
								);
							})}
						</select>

						///////////////////////////////

						   <table>
    <thead>
     <tr>
      <th>
       EN
      </th>
      <th>
       KOR
      </th>
     </tr>
    </thead>
    <tbody>
     {words.map((wor, worIdx) => {
      return (
       <>
        <tr>
         <td>{wor.eng}</td>
         <td>{wor.kor}</td>
        </tr>
       </>
      )
     })}

    </tbody>
   </table>