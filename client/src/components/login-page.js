import React from 'react';
import {SERVER_ROOT} from '../config';

export default class LoginPage extends React.Component {
//   constructor() {
//   super()
// }

render() {
  return(
    <div>
      <h1>Learn Spanish with Maestro</h1>
      <a href={`${SERVER_ROOT}/auth/google`}>Vamos con Google!!</a>

    </div>

      )
      }
      }
