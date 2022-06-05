import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import { Typography, Divider } from "@material-ui/core";
import API from "../API";
import { useMediaQuery, useTheme } from '@material-ui/core';


function History() {

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
  const [tra, setTransfers] = useState([]);

  useEffect(() => {
    API.getAllHistory()
      .then(res => setTransfers(res.data))
      .catch(err => {
        console.error(err)
      })
  }, [])

  const sortedUsers = tra.sort((a, b) => b.time - a.time);
  return (
    <div style={{ marginBottom: '14em', marginTop: '2em' }}>
      <Typography style={{ textAlign: 'center' }} variant='h3'>
        Transaction History
      </Typography>
      <Divider />
      <div>
        <table style={{ width: matchesXS ? '25em' : matchesSM ? '30em' : matchesMD ? '60em' : '70em' }}>
          <thead>
            <tr>
              <th>TIME</th>
              <th>FROM USER</th>
              <th>TO USER</th>
              <th>AMOUNT(₴)</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((data) => (
              <tr key={Math.random().toString(36).substr(2, 9)}>
                <td data-column="TIME">{moment(Number(data.time)).format('h:mm A ll')}</td>
                <td data-column="FROM USER">{data.sender}</td>
                <td data-column="TO USER">{data.recipient}</td>
                <td data-column="AMOUNT(₴)">{data.amount}₴</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  )

}
export default History;





