import { Divider, Typography } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@material-ui/core';
// import { db } from '../firebase';
// import {useNavigate} from "react-router-dom";
import API from '../API';
import { AuthContext } from './Context';

export default function Users() {

  const { jwt, role } = useContext(AuthContext)

  const history = useHistory();

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.getAllUsers()
      .then(res => setPosts(res.data))
      .catch(err => {
        history.push("/create");
        console.error(err)
      })
  }, [])

  return (
    <div style={{ marginBottom: '14em', marginTop: '2em' }}>
      <Typography style={{ textAlign: 'center' }} variant='h3'>
        Users
      </Typography>
      <Divider />
      <div>
        <table style={{ width: matchesXS ? '25em' : matchesSM ? '35em' : matchesMD ? '55em' : '70em' }}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NO.</th>
              <th>BALANCE(₴)</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((data) => (
              <tr>
                <td data-column="NAME">{data.username}</td>
                <td data-column="Email">{data.email}</td>
                <td data-column="Phone No">{data.phone}</td>
                <td data-column="BALANCE(₴)">{data.amount}₴</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}