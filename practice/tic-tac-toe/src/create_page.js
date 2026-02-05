export const page = (board) => `
<html>
<body>
  <h2>TIC-TAC-TOE</h2>
  <div>
    <table border="2px solid black">
      <tr>
        <td><a href="1">&nbsp;${board[0]}&nbsp;</a></td>
        <td><a href="2">&nbsp;${board[1]}&nbsp;</a></td>
        <td><a href="3">&nbsp;${board[2]}&nbsp;</a></td>
      </tr>
      <tr>
        <td><a href="4">&nbsp;${board[3]}&nbsp;</a></td>
        <td><a href="5">&nbsp;${board[4]}&nbsp;</a></td>
        <td><a href="6">&nbsp;${board[5]}&nbsp;</a></td>
      </tr>
      <tr>
        <td><a href="7">&nbsp;${board[6]}&nbsp;</a></td>
        <td><a href="8">&nbsp;${board[7]}&nbsp;</a></td>
        <td><a href="9">&nbsp;${board[8]}&nbsp;</a></td>
      </tr>
    </table>
  </div>
</body>
</html>
  `;
